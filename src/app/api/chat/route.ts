import { anthropic } from "@ai-sdk/anthropic";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { storageUrl, type VenueRow, type VendorRow, type GalleryRow } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

// Budget-friendly model per client request. Swap to claude-sonnet-4-5-20250929
// if richer reasoning is ever needed.
const MODEL_ID = "claude-haiku-4-5-20251001";

const SYSTEM_PROMPT = `You are Wedding Buddy — a warm, witty, impeccably tasteful AI wedding concierge built for the Kerala / Indian market.

You have live tools to look up real venues, vendors, and inspiration photos from the Wedding Buddy catalogue. USE THEM for any request that involves specific venues, vendors, prices, photos, or "show me" / "find me" intent. Don't invent listings — call the tool.

Identity & tone:
- Speak like a trusted planner-friend, not a chatbot. Short paragraphs. Warm, decisive, concise.
- Reference specifics where helpful: Sadya, Kanjivaram, muhurtham, mandap, baraat, Malayalam terms, Kumarakom, Kochi, Munnar, Varkala.
- Use ₹ (not $) and Indian number formats (₹8,50,000). Keep replies under 140 words unless the user asks for a full breakdown.

Tool-use playbook:
- User asks about venues ("backwater venue", "palace in Kochi", "under ₹10L") → call searchVenues.
- User asks about photographers / caterers / décor / makeup → call searchVendors with the right category.
- User asks to *see* something, for inspiration, or mood boards → call getGalleryInspiration.
- After a tool returns, write ONE short paragraph commenting on the results — the UI renders the cards with photos, so don't re-list names & prices.
- If a tool returns zero items, say so warmly and offer to broaden the search.

Rules:
- Never invent vendor prices — use only tool output.
- If asked something outside weddings (code, homework, politics), gently steer back: you're a wedding concierge.
- Never say "as an AI" — you're Wedding Buddy.`;

// ============================================================================
// Tools — each queries Supabase via the service_role client
// ============================================================================

const searchVenuesInput = z.object({
  region: z.string().optional().describe("One of: Kochi, Kumarakom, Munnar, Thekkady, Wayanad, Varkala, Thiruvananthapuram"),
  type: z.string().optional().describe("One of: Palace, Resort, Beachfront, Heritage, Estate, Houseboat"),
  maxBudget: z.number().optional().describe("Maximum starting price in INR rupees (integer, no paise)"),
  minCapacity: z.number().optional().describe("Minimum guest capacity required"),
  limit: z.number().optional().default(4).describe("Max cards to return (default 4, max 6)"),
});

const searchVendorsInput = z.object({
  category: z
    .enum(["Photographers", "Caterers", "Decorators", "Makeup Artists"])
    .describe("Required. Pick the best match based on user intent."),
  maxBudget: z.number().optional().describe("Maximum starting price in INR rupees"),
  limit: z.number().optional().default(4).describe("Max cards to return (default 4, max 6)"),
});

const galleryInput = z.object({
  tags: z.array(z.string()).optional().describe("Theme tags: mandap, floral, backwater, sadya, mehendi, sunset, palace, etc."),
  limit: z.number().optional().default(4).describe("Max photos (default 4, max 6)"),
});

function shapeVenue(v: VenueRow) {
  return {
    id: v.id,
    slug: v.slug,
    name: v.name,
    location: v.location,
    region: v.region,
    type: v.type,
    priceFrom: v.price_from,
    capacity: `${v.capacity_min} – ${v.capacity_max} guests`,
    tagline: v.tagline,
    highlights: v.highlights,
    gradient: v.gradient,
    featured: v.featured,
    image: storageUrl(v.image_path),
  };
}

function shapeVendor(v: VendorRow) {
  return {
    id: v.id,
    slug: v.slug,
    category: v.category,
    name: v.name,
    tagline: v.tagline,
    location: v.location,
    priceFrom: v.price_from,
    priceUnit: v.price_unit,
    rating: Number(v.rating),
    reviews: v.reviews,
    specialties: v.specialties,
    gradient: v.gradient,
    initials: v.initials,
    verified: v.verified,
    featured: v.featured,
    image: storageUrl(v.image_path),
  };
}

function shapeGallery(g: GalleryRow) {
  return {
    id: g.id,
    title: g.title,
    caption: g.caption,
    tags: g.tags,
    image: storageUrl(g.image_path),
  };
}

export async function POST(req: Request) {
  console.log("[chat] ▶ POST /api/chat");

  try {
    const body = (await req.json()) as {
      messages?: UIMessage[];
      language?: "en" | "ml";
      weddingContext?: { crowd: string; place: string; foodType: string };
    };
    const messages = body?.messages ?? [];
    const language = body?.language ?? "en";
    const ctx = body?.weddingContext;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "messages is required" }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("[chat] ✖ ANTHROPIC_API_KEY missing — add it to .env.local");
      return Response.json(
        {
          error:
            "Server misconfigured: ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the dev server.",
        },
        { status: 500 }
      );
    }

    const languageAddendum =
      language === "ml"
        ? "\n\nIMPORTANT — LANGUAGE OVERRIDE: The user has selected Malayalam (മലയാളം). All your conversational replies MUST be written entirely in Malayalam script. Tool calls and internal JSON remain in English, but every word the user reads must be in Malayalam."
        : "";

    const contextAddendum = ctx
      ? `\n\nUser onboarding preferences (collected before the chat opened — treat as known context, do NOT ask about these again):\n- Expected guests: ${ctx.crowd}\n- Preferred location: ${ctx.place}\n- Food style: ${ctx.foodType}\nFactor these into every recommendation automatically.`
      : "";

    const systemPrompt = SYSTEM_PROMPT + languageAddendum + contextAddendum;

    const result = streamText({
      model: anthropic(MODEL_ID),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      temperature: 0.6,
      stopWhen: stepCountIs(4),
      tools: {
        searchVenues: tool({
          description:
            "Search the Kerala venue catalogue. Use for any 'find a venue', 'palace in Kochi', 'backwater venue under X' type request.",
          inputSchema: searchVenuesInput,
          async execute(input) {
            const limit = Math.min(Math.max(input.limit ?? 4, 1), 6);
            let q = supabaseAdmin.from("venues").select("*").order("featured", { ascending: false });
            if (input.region) q = q.eq("region", input.region);
            if (input.type) q = q.eq("type", input.type);
            if (input.maxBudget) q = q.lte("price_from", input.maxBudget);
            if (input.minCapacity) q = q.gte("capacity_max", input.minCapacity);
            q = q.limit(limit);
            const { data, error } = await q.returns<VenueRow[]>();
            if (error) {
              console.error("[chat] searchVenues error:", error);
              return { items: [], error: error.message };
            }
            return { items: (data ?? []).map(shapeVenue) };
          },
        }),

        searchVendors: tool({
          description:
            "Search the vetted vendor catalogue by category (Photographers, Caterers, Decorators, Makeup Artists). Use whenever the user asks about a specific vendor type.",
          inputSchema: searchVendorsInput,
          async execute(input) {
            const limit = Math.min(Math.max(input.limit ?? 4, 1), 6);
            let q = supabaseAdmin
              .from("vendors")
              .select("*")
              .eq("category", input.category)
              .order("featured", { ascending: false })
              .order("rating", { ascending: false });
            if (input.maxBudget) q = q.lte("price_from", input.maxBudget);
            q = q.limit(limit);
            const { data, error } = await q.returns<VendorRow[]>();
            if (error) {
              console.error("[chat] searchVendors error:", error);
              return { items: [], error: error.message };
            }
            return { items: (data ?? []).map(shapeVendor) };
          },
        }),

        getGalleryInspiration: tool({
          description:
            "Fetch inspiration photos from the curated gallery. Use when the user wants to SEE something — mood boards, examples, visual ideas.",
          inputSchema: galleryInput,
          async execute(input) {
            const limit = Math.min(Math.max(input.limit ?? 4, 1), 6);
            let q = supabaseAdmin.from("gallery").select("*");
            if (input.tags && input.tags.length > 0) {
              q = q.overlaps("tags", input.tags);
            }
            q = q.limit(limit);
            const { data, error } = await q.returns<GalleryRow[]>();
            if (error) {
              console.error("[chat] getGalleryInspiration error:", error);
              return { items: [], error: error.message };
            }
            return { items: (data ?? []).map(shapeGallery) };
          },
        }),
      },
      onError({ error }) {
        console.error("[chat] ✖ streamText error:", error);
      },
      onFinish({ finishReason, usage }) {
        console.log(
          `[chat] ✓ finished (${finishReason}) · in=${usage?.inputTokens ?? "?"} out=${usage?.outputTokens ?? "?"}`
        );
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[chat] ✖ FATAL handler error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: `Failed to connect to AI: ${message}` }, { status: 500 });
  }
}

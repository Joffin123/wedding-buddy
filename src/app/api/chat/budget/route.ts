import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL_ID = "claude-haiku-4-5-20251001";

const BUDGET_ITEMS = `
BUDGET ITEM IDs — use these exact IDs in updateBudget calls:

VENUE (category: venue)
  v1 Ceremony Venue          | v2 Reception Venue
  v3 Guest Accommodation     | v4 Venue Decorator Deposit

CATERING & FOOD (category: catering)
  c1 Sadya / Traditional Feast | c2 Reception Dinner / Buffet
  c3 Snacks & Tea / Coffee     | c4 Wedding Cake & Desserts
  c5 Service Staff

DÉCOR & FLORAL (category: decor)
  d1 Mandap / Pooja Decoration | d2 Stage & Backdrop
  d3 Floral Arrangements       | d4 Lighting & LED Setup
  d5 Entrance & Aisle Décor    | d6 Table Centrepieces

PHOTOGRAPHY & VIDEO (category: photo)
  p1 Photography (Full Day) | p2 Videography
  p3 Drone Shots            | p4 Pre-Wedding Shoot
  p5 Photo Album / Prints

ENTERTAINMENT (category: entertainment)
  e1 DJ / Sound System     | e2 Live Band / Orchestra
  e3 Cultural Performances | e4 Mehendi Artist

BRIDAL & ATTIRE (category: bridal)
  b1 Bridal Saree / Lehenga | b2 Groom Attire
  b3 Bridal Jewellery        | b4 Bridal Mehendi
  b5 Bridal Makeup & Hair    | b6 Family Attire (Parents)

CEREMONY & RITUALS (category: ceremony)
  r1 Priest / Officiant Fees | r2 Pooja Items & Materials
  r3 Elephant (Anayottam)    | r4 Fireworks / Sparklers

INVITATIONS & STATIONERY (category: stationery)
  s1 Wedding Invitations        | s2 Digital Invites & WhatsApp
  s3 Event Program Cards        | s4 Place Cards & Table Numbers

TRANSPORTATION (category: transport)
  t1 Bridal Car (Decorated) | t2 Guest Buses / Transport
  t3 Airport Transfers

OTHER & MISCELLANEOUS (category: other)
  o1 Wedding Planner     | o2 Guest Gifts / Favours
  o3 Honeymoon Deposit   | o4 Contingency Buffer (auto-calculated, skip this)
`.trim();

const SYSTEM_PROMPT = `You are the Wedding Buddy Budget Assistant — a warm, expert AI that helps Kerala couples build and refine their wedding budget.

You have ONE primary tool: updateBudget. Use it to update specific line items with realistic Kerala wedding costs whenever a user:
- Asks you to "create a budget", "build a budget", "set up a budget"
- Gives you context like guest count, location, total budget, or wedding style
- Asks to adjust a specific category or item

TOOL-USE RULES:
- Always call updateBudget when you have enough context to set meaningful values
- Update ALL relevant items when creating a full budget (aim for 15-30 items minimum)
- Use realistic Kerala wedding pricing in INR
- Skip o4 (contingency — auto-calculated)
- After the tool call, write a SHORT friendly explanation (under 100 words) of what you set and why

KERALA PRICING BENCHMARKS (per pax unless stated):
- Sadya: ₹350–700 per plate × guest count → use for c1
- Hotel reception per-pax: ₹1,500–3,500 per pax → use for c2
- Photography full day: ₹40,000–1,20,000 → p1
- Décor (stage + floral): ₹60,000–2,00,000 → d2 + d3
- DJ: ₹20,000–50,000 → e1
- Bridal makeup: ₹10,000–30,000 → b5
- Wedding planner: ₹30,000–1,00,000 → o1
- Venue (flat): ₹80,000–5,00,000 → v1 or v2

TONE: warm, concise, decisive. One short paragraph after tool use. Never say "as an AI."

${BUDGET_ITEMS}`;

const updateBudgetSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().describe("Budget item ID (e.g. v1, c2, p1)"),
      estimated: z.number().describe("Estimated amount in INR rupees (integer)"),
    })
  ).describe("Array of budget items to update"),
  summary: z.string().describe("1-2 sentence summary of the budget you just set for the user"),
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      messages?: UIMessage[];
      language?: "en" | "ml";
      weddingContext?: { pax?: number; venueId?: string | null; venueName?: string | null; venuePrice?: number | null; foodType?: string };
    };
    const messages = body?.messages ?? [];
    const language = body?.language ?? "en";
    const ctx = body?.weddingContext;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "messages is required" }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
    }

    const languageAddendum =
      language === "ml"
        ? "\n\nIMPORTANT: Respond in Malayalam script. Tool calls stay in English."
        : "";

    const contextAddendum = ctx
      ? `\n\nUser-provided wedding details (collected before this chat opened via a quick setup wizard — treat as known, do NOT ask about these again):\n- Guest count (PAX): ${ctx.pax}\n${ctx.venueName ? `- Selected venue: ${ctx.venueName} (₹${ctx.venuePrice ?? "?"} starting price)\n` : "- No venue selected yet\n"}- Food style: ${ctx.foodType}\n\nUse the exact PAX count for any per-plate catering math (c1 for Sadya, c2 for Reception Dinner / Buffet or North Indian). If a venue with a price was given, keep that price for v1 (Ceremony Venue) unless the user explicitly asks to change it.`
      : "";

    const result = streamText({
      model: anthropic(MODEL_ID),
      system: SYSTEM_PROMPT + languageAddendum + contextAddendum,
      messages: await convertToModelMessages(messages),
      temperature: 0.4,
      stopWhen: stepCountIs(3),
      tools: {
        updateBudget: tool({
          description:
            "Update one or more wedding budget line items with AI-suggested estimated amounts. Call this whenever the user wants to create, build, or adjust their budget.",
          inputSchema: updateBudgetSchema,
          async execute(input) {
            return { updates: input.items, summary: input.summary };
          },
        }),
      },
      onError({ error }) {
        console.error("[chat/budget] error:", error);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: `Budget chat failed: ${message}` }, { status: 500 });
  }
}

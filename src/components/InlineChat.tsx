"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { UIMessage } from "ai";

// ---------- Suggestion prompts rotating on the empty state ----------
const SUGGESTIONS = [
  "Find a backwater venue in Kumarakom for 200 guests",
  "Show me candid photographers under ₹2L",
  "What does a plated sadya caterer cost?",
  "Palace venues in Kochi — show photos",
  "Mood board: floral mandaps",
  "Décor team for a mehendi night",
];

// ---------- Types matching the tool outputs on the server ----------
type VenueCard = {
  id: string; slug: string; name: string; location: string; region: string; type: string;
  priceFrom: number; capacity: string; tagline: string; highlights: string[];
  gradient: string; featured: boolean; image: string | null;
};
type VendorCard = {
  id: string; slug: string; category: string; name: string; tagline: string; location: string;
  priceFrom: number; priceUnit: string; rating: number; reviews: number; specialties: string[];
  gradient: string; initials: string; verified: boolean; featured: boolean; image: string | null;
};
type GalleryCard = {
  id: string; title: string; caption: string | null; tags: string[]; image: string | null;
};

type ToolPart = {
  type: `tool-${string}`;
  toolCallId: string;
  state: "input-streaming" | "input-available" | "output-available" | "output-error" | "approval-requested";
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

const INR = (n: number) => "₹" + n.toLocaleString("en-IN");

function messageText(m: UIMessage): string {
  return m.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("");
}

// ============================================================================
// Card renderers
// ============================================================================

function VenueCardGrid({ items }: { items: VenueCard[] }) {
  if (!items.length) return <EmptyToolResult label="venues" />;
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {items.map((v) => (
        <article
          key={v.id}
          className="group overflow-hidden rounded-2xl border border-rose-100 bg-white/95 shadow-[0_8px_30px_-18px_rgba(232,115,155,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-20px_rgba(232,115,155,0.55)]"
        >
          <div className={`relative aspect-[5/3] overflow-hidden bg-gradient-to-br ${v.gradient}`}>
            {v.image ? (
              <Image
                src={v.image}
                alt={v.name}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <GradientFallback label={v.type} />
            )}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
              <span className="rounded-full border border-rose-200 bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2A1A33] backdrop-blur-sm">
                {v.type}
              </span>
              {v.featured && (
                <span className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-md">
                  ★ Featured
                </span>
              )}
            </div>
          </div>
          <div className="p-3.5">
            <h4 className="font-display text-lg font-medium leading-tight text-[#2A1A33]">{v.name}</h4>
            <p className="mt-0.5 text-xs text-[#2A1A33]/60">{v.location}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#2A1A33]/80">{v.tagline}</p>
            <div className="mt-3 flex items-end justify-between border-t border-rose-100 pt-2.5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#2A1A33]/45">From</p>
                <p className="font-display text-base font-medium text-[#2A1A33] leading-tight">{INR(v.priceFrom)}</p>
                <p className="text-[10px] text-[#2A1A33]/50">{v.capacity}</p>
              </div>
              <Link
                href="/contact"
                className="rounded-full bg-rose-50 px-3 py-1.5 text-[10px] font-bold text-rose-700 transition-all hover:bg-gradient-to-r hover:from-rose-500 hover:to-indigo-500 hover:text-white"
              >
                Enquire →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function VendorCardGrid({ items }: { items: VendorCard[] }) {
  if (!items.length) return <EmptyToolResult label="vendors" />;
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      {items.map((v) => (
        <article
          key={v.id}
          className="group overflow-hidden rounded-2xl border border-rose-100 bg-white/95 shadow-[0_8px_30px_-18px_rgba(232,115,155,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-20px_rgba(232,115,155,0.55)]"
        >
          <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${v.gradient}`}>
            {v.image ? (
              <Image
                src={v.image}
                alt={v.name}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl font-medium text-white/80 drop-shadow-sm">
                  {v.initials}
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
              {v.verified && (
                <span className="rounded-full border border-rose-200 bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2A1A33] backdrop-blur-sm">
                  ✓ Verified
                </span>
              )}
              {v.featured && (
                <span className="ml-auto rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-md">
                  ★ Top
                </span>
              )}
            </div>
          </div>
          <div className="p-3.5">
            <div className="flex items-start justify-between">
              <h4 className="font-display text-lg font-medium leading-tight text-[#2A1A33]">{v.name}</h4>
              <span className="flex-shrink-0 text-xs font-semibold text-amber-600 ml-2">
                ★ {v.rating.toFixed(1)}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-[#2A1A33]/55">{v.location}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#2A1A33]/80">{v.tagline}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {v.specialties.slice(0, 3).map((s) => (
                <span key={s} className="rounded-full border border-rose-100 bg-rose-50/70 px-1.5 py-0.5 text-[9px] font-semibold text-rose-700">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-end justify-between border-t border-rose-100 pt-2.5">
              <div>
                <p className="font-display text-base font-medium text-[#2A1A33] leading-tight">{INR(v.priceFrom)}</p>
                <p className="text-[10px] text-[#2A1A33]/50">{v.priceUnit}</p>
              </div>
              <Link
                href="/contact"
                className="rounded-full bg-rose-50 px-3 py-1.5 text-[10px] font-bold text-rose-700 transition-all hover:bg-gradient-to-r hover:from-rose-500 hover:to-indigo-500 hover:text-white"
              >
                Contact →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function GalleryGrid({ items }: { items: GalleryCard[] }) {
  if (!items.length) return <EmptyToolResult label="inspiration" />;
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-3">
      {items.map((g) => (
        <figure key={g.id} className="group overflow-hidden rounded-2xl border border-rose-100 bg-white/90">
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-100 via-amber-100 to-indigo-100">
            {g.image ? (
              <Image
                src={g.image}
                alt={g.title}
                fill
                sizes="(max-width: 640px) 50vw, 200px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <GradientFallback label={g.tags[0] || "inspiration"} />
            )}
          </div>
          <figcaption className="p-2.5">
            <p className="text-xs font-semibold text-[#2A1A33]">{g.title}</p>
            {g.caption && <p className="mt-0.5 text-[10px] leading-relaxed text-[#2A1A33]/60 line-clamp-2">{g.caption}</p>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function EmptyToolResult({ label }: { label: string }) {
  return (
    <div className="mt-3 rounded-2xl border border-dashed border-rose-200 bg-white/70 p-4 text-xs text-[#2A1A33]/65">
      No {label} match yet — try loosening the filters.
    </div>
  );
}

function GradientFallback({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="h-full w-full text-white/60" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M0 220 L80 170 L140 200 L200 150 L260 180 L320 140 L400 170 L400 300 L0 300 Z" fill="currentColor" />
        <path d="M0 250 L60 230 L120 245 L200 220 L280 240 L360 220 L400 235 L400 300 L0 300 Z" fill="currentColor" opacity="0.5" />
        <circle cx="340" cy="60" r="18" fill="currentColor" opacity="0.7" />
      </svg>
      <span className="absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 drop-shadow">
        {label}
      </span>
    </div>
  );
}

// ============================================================================
// Tool-part dispatcher
// ============================================================================

function RenderToolPart({ part }: { part: ToolPart }) {
  const name = part.type.replace(/^tool-/, "");
  const pending = part.state === "input-streaming" || part.state === "input-available";
  const errored = part.state === "output-error";

  if (pending) {
    return (
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-rose-100 bg-white/70 px-3 py-2 text-xs text-[#2A1A33]/70">
        <span className="flex h-1.5 w-1.5 animate-ping rounded-full bg-rose-400" />
        Looking up {name === "searchVenues" ? "venues" : name === "searchVendors" ? "vendors" : "inspiration"} …
      </div>
    );
  }
  if (errored) {
    return (
      <div className="mt-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
        Couldn&apos;t load results: {part.errorText || "unknown error"}
      </div>
    );
  }

  const out = part.output as { items?: unknown[]; error?: string } | undefined;
  if (out?.error) {
    return (
      <div className="mt-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
        {out.error}
      </div>
    );
  }

  if (name === "searchVenues") return <VenueCardGrid items={(out?.items ?? []) as VenueCard[]} />;
  if (name === "searchVendors") return <VendorCardGrid items={(out?.items ?? []) as VendorCard[]} />;
  if (name === "getGalleryInspiration") return <GalleryGrid items={(out?.items ?? []) as GalleryCard[]} />;
  return null;
}

// ============================================================================
// Main inline chat
// ============================================================================

export default function InlineChat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop, clearError } = useChat({
    onError: (err) => console.error("[InlineChat] error from /api/chat:", err),
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    if (error) clearError();
    setInput("");
    void sendMessage({ text: trimmed }).catch((e) => console.error("[InlineChat] sendMessage threw:", e));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit(input);
    }
  }

  return (
    <div id="wb-chat" className="relative w-full">
      {/* Decorative glow */}
      <div aria-hidden className="pointer-events-none absolute -inset-4 -z-10">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-rose-200/40 via-amber-200/30 to-indigo-200/40 blur-3xl" />
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-rose-200/80 bg-white/85 backdrop-blur-2xl shadow-[0_30px_90px_-30px_rgba(232,115,155,0.55)]">
        {/* Decorative wedding motifs inside the panel */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg className="absolute -top-6 -right-6 h-32 w-32 text-rose-200/50 animate-wb-spin-slow" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.1">
            <circle cx="32" cy="32" r="4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <ellipse key={a} cx="32" cy="18" rx="4" ry="10" transform={`rotate(${a} 32 32)`} />
            ))}
          </svg>
          <svg className="absolute -bottom-4 -left-4 h-28 w-28 text-amber-200/50 animate-wb-spin-slow" style={{ animationDirection: "reverse" }} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.1">
            <circle cx="32" cy="32" r="4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <ellipse key={a} cx="32" cy="18" rx="4" ry="10" transform={`rotate(${a} 32 32)`} />
            ))}
          </svg>
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-rose-100/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-rose-500/30 animate-wb-bob">
              WB
            </div>
            <div>
              <h2 className="font-display text-lg font-medium text-[#2A1A33] leading-tight">Wedding Buddy Concierge</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-600 leading-tight">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                AI · Live · Kerala-first
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-[11px] text-[#2A1A33]/55 sm:flex">
            <svg className="h-4 w-4 text-rose-500 animate-wb-heart-beat" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21s-7-4.35-9.33-9.02C.67 8.17 2.88 4 6.75 4A5.5 5.5 0 0 1 12 7.25 5.5 5.5 0 0 1 17.25 4C21.12 4 23.33 8.17 21.33 11.98 19 16.65 12 21 12 21z" />
            </svg>
            Ask anything — real venues & vendors
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-y-auto px-4 sm:px-6 py-5 [scrollbar-width:thin] [scrollbar-color:rgba(232,115,155,0.35)_transparent]"
          style={{ minHeight: "480px", maxHeight: "600px" }}
        >
          {messages.length === 0 && (
            <div className="mx-auto max-w-2xl space-y-5">
              <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-indigo-50 p-5 sm:p-6 shadow-sm">
                <p className="font-display text-xl sm:text-2xl font-normal leading-relaxed text-[#2A1A33] text-balance">
                  Namaskaram 🙏 I&apos;m your Wedding Buddy concierge. Tell me your date, budget, or dream venue — I&apos;ll pull up real options with photos in seconds.
                </p>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50">
                  Try asking
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      disabled={isBusy}
                      className="group flex items-start gap-2 rounded-2xl border border-rose-100 bg-white px-4 py-3 text-left text-xs leading-relaxed text-[#2A1A33]/80 transition-all hover:-translate-y-0.5 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
                    >
                      <svg className="mt-0.5 h-3 w-3 flex-shrink-0 text-rose-400 transition-colors group-hover:text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((m) => {
              const isUser = m.role === "user";
              const text = messageText(m);
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[92%] ${isUser ? "" : "w-full"}`}>
                    {text && (
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          isUser
                            ? "bg-gradient-to-br from-rose-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/30"
                            : "border border-rose-100 bg-white text-[#2A1A33]"
                        }`}
                      >
                        {text.split("\n").map((line, i) => (
                          <p key={i} className={i > 0 ? "mt-2" : ""}>
                            {line || "\u00A0"}
                          </p>
                        ))}
                      </div>
                    )}
                    {!isUser &&
                      (m.parts as unknown as ToolPart[])
                        .filter((p) => typeof p.type === "string" && p.type.startsWith("tool-"))
                        .map((p) => <RenderToolPart key={p.toolCallId} part={p} />)}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl border border-rose-100 bg-white px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose-400" />
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-rose-300 bg-rose-50 p-3">
                <p className="text-xs font-semibold text-rose-700">Something went wrong.</p>
                <p className="mt-1 text-xs leading-relaxed text-rose-600">
                  {error.message || "The concierge couldn't be reached."}
                </p>
                <button onClick={() => clearError()} className="mt-2 text-[11px] font-bold uppercase tracking-wider text-rose-700 hover:text-rose-900">
                  Dismiss →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="relative border-t border-rose-100/70 bg-white/80 p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 rounded-full border border-rose-200 bg-white pl-5 pr-1.5 focus-within:border-rose-400 focus-within:shadow-[0_0_0_4px_rgba(232,115,155,0.12)] transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={isBusy ? "Concierge is thinking…" : "Ask anything about your wedding…"}
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent py-3.5 text-sm text-[#2A1A33] placeholder:text-[#2A1A33]/40 focus:outline-none"
            />
            {isBusy ? (
              <button
                type="button"
                onClick={() => stop()}
                aria-label="Stop generation"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-colors hover:bg-rose-200"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="3" width="10" height="10" rx="1.5" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500 text-white transition-all enabled:hover:shadow-[0_0_22px_rgba(232,115,155,0.55)] disabled:cursor-not-allowed disabled:bg-none disabled:bg-rose-100 disabled:text-rose-300"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3.105 3.105a1.5 1.5 0 012.122-.001l12.728 7.364a1 1 0 010 1.732L5.227 19.564a1.5 1.5 0 01-2.122-2.122L7.586 13H11a1 1 0 100-2H7.586L3.105 5.227a1.5 1.5 0 010-2.122z" />
                </svg>
              </button>
            )}
          </div>
          <p className="mt-2 text-center text-[10px] text-[#2A1A33]/50">
            Powered by Wedding Buddy AI · Real data from our Kerala catalogue · Your chat stays private
          </p>
        </form>
      </div>
    </div>
  );
}

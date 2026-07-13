"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import type { BudgetIntake } from "@/components/BudgetOnboarding";

// ─── Types ────────────────────────────────────────────────────────────────────

type BudgetUpdate = { id: string; estimated: number };

type ToolPart = {
  type: `tool-${string}`;
  toolCallId: string;
  state: "input-streaming" | "input-available" | "output-available" | "output-error" | "approval-requested";
  input?: unknown;
  output?: unknown;
};

// ─── Utils ────────────────────────────────────────────────────────────────────

function messageText(m: UIMessage): string {
  return m.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("");
}

const SUGGESTIONS = [
  "Create a full budget for 300 guests in Kochi with ₹15 lakh",
  "Set up a budget for a 500-guest traditional wedding in Thrissur",
  "Budget for an intimate 100-guest Alappuzha backwater wedding",
  "Adjust photography and videography to ₹80,000 total",
  "Increase catering budget for a grand Sadya feast",
];

// ─── Main Component ───────────────────────────────────────────────────────────

interface BudgetChatProps {
  onBudgetUpdate: (updates: BudgetUpdate[]) => void;
  weddingContext?: BudgetIntake | null;
}

export default function BudgetChat({ onBudgetUpdate, weddingContext }: BudgetChatProps) {
  const [language, setLanguage] = useState<"en" | "ml">("en");
  const [input, setInput] = useState("");
  const [lastApplied, setLastApplied] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ref so the transport always reads the latest language/context without
  // recreating the transport (and losing the chat) on every render.
  const bodyRef = useRef<{ language: "en" | "ml"; weddingContext?: BudgetIntake | null }>({
    language: "en",
    weddingContext: weddingContext ?? null,
  });
  bodyRef.current = { language, weddingContext: weddingContext ?? null };

  const transportRef = useRef(
    new DefaultChatTransport({
      api: "/api/chat/budget",
      body: () => bodyRef.current,
    })
  );

  const { messages, sendMessage, status, error, stop, clearError } = useChat({
    transport: transportRef.current,
    onError: (err) => console.error("[BudgetChat] error:", err),
  });

  const isBusy = status === "submitted" || status === "streaming";

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  // Watch for updateBudget tool outputs and apply them
  useEffect(() => {
    for (const m of messages) {
      if (m.role !== "assistant") continue;
      const parts = m.parts as unknown as ToolPart[];
      for (const part of parts) {
        if (
          part.type === "tool-updateBudget" &&
          part.state === "output-available" &&
          part.toolCallId !== lastApplied
        ) {
          const out = part.output as { updates?: BudgetUpdate[] } | undefined;
          if (out?.updates?.length) {
            onBudgetUpdate(out.updates);
            setLastApplied(part.toolCallId);
          }
        }
      }
    }
  }, [messages, lastApplied, onBudgetUpdate]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    if (error) clearError();
    setInput("");
    void sendMessage({ text: trimmed }).catch((e) => console.error("[BudgetChat] sendMessage threw:", e));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit(input);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-purple-200 bg-white/90 backdrop-blur-xl shadow-[0_20px_70px_-20px_rgba(139,49,199,0.18)]">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-100/60 bg-gradient-to-r from-purple-50/30 to-pink-50/30 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B31C7] via-fuchsia-500 to-indigo-500 text-xs font-bold text-white shadow-md">
            AI
          </div>
          <div>
            <p className="font-semibold text-sm text-[#2A1A33] leading-tight">Budget AI Assistant</p>
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live · Kerala-first
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50/80 p-0.5 text-[11px] font-bold">
          <button
            onClick={() => setLanguage("en")}
            className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${language === "en" ? "bg-white shadow-sm text-[#2A1A33]" : "text-[#2A1A33]/50 hover:text-[#2A1A33]/80"}`}
          >EN</button>
          <button
            onClick={() => setLanguage("ml")}
            className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${language === "ml" ? "bg-white shadow-sm text-[#2A1A33]" : "text-[#2A1A33]/50 hover:text-[#2A1A33]/80"}`}
          >മല</button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="overflow-y-auto px-4 py-4 sm:px-5 [scrollbar-width:thin] [scrollbar-color:rgba(139,49,199,0.25)_transparent]"
        style={{ minHeight: "300px", maxHeight: "420px" }}
      >
        {messages.length === 0 && (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-purple-100 bg-gradient-to-br from-[#F5F0FF]/60 via-white to-pink-50/40 p-4.5 text-sm text-[#2A1A33] leading-relaxed"
            >
              {language === "ml"
                ? "നമസ്കാരം 🙏 ഞാൻ നിങ്ങളുടെ budget assistant ആണ്. Guest count, location, total budget — ഇതൊക്കെ പറഞ്ഞാൽ ഞാൻ full budget create ചെയ്തു തരാം!"
                : weddingContext
                ? `Namaskaram 🙏 I already know you're planning for ${weddingContext.pax} guests${weddingContext.venueName ? ` at ${weddingContext.venueName}` : ""} with a ${weddingContext.foodType} menu — just say "build my budget" and I'll fill in every line item using those exact numbers.`
                : "Namaskaram 🙏 Tell me about your wedding — guest count, location, budget ceiling — and I'll instantly fill in a realistic Kerala budget for you. You can then edit any line item manually."}
            </motion.div>
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/45">Try asking</p>
              <div className="grid gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => submit(s)}
                    disabled={isBusy}
                    className="flex items-start gap-2 rounded-xl border border-purple-100 bg-white px-3.5 py-2.5 text-left text-xs text-[#2A1A33]/75 transition-all duration-200 hover:border-[#8B31C7] hover:bg-[#F5F0FF]/30 hover:text-[#8B31C7] disabled:opacity-50"
                  >
                    <svg className="mt-0.5 h-3 w-3 flex-shrink-0 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {messages.map((m) => {
            const isUser = m.role === "user";
            const text = messageText(m);
            const toolParts = (m.parts as unknown as ToolPart[]).filter(
              (p) => typeof p.type === "string" && p.type.startsWith("tool-")
            );
            const appliedUpdate = toolParts.find(
              (p) => p.type === "tool-updateBudget" && p.state === "output-available"
            );

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[90%] space-y-2 ${isUser ? "" : "w-full"}`}>
                  {text && (
                    <div className={`rounded-2xl px-4.5 py-3 text-sm leading-relaxed ${isUser ? "bg-gradient-to-r from-[#8B31C7] via-fuchsia-600 to-[#8B31C7] text-white shadow-md shadow-purple-500/20" : "border border-purple-100 bg-white text-[#2A1A33]"}`}>
                      {text.split("\n").map((line, i) => <p key={i} className={i > 0 ? "mt-1" : ""}>{line || " "}</p>)}
                    </div>
                  )}

                  {/* Tool pending */}
                  {toolParts.some((p) => p.state === "input-streaming" || p.state === "input-available") && (
                    <div className="flex items-center gap-2 rounded-xl border border-purple-100 bg-white px-3 py-2.5 text-xs text-[#2A1A33]/60">
                      <span className="flex h-1.5 w-1.5 animate-ping rounded-full bg-purple-400" />
                      Calculating your Kerala wedding budget…
                    </div>
                  )}

                  {/* Applied badge */}
                  {appliedUpdate && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"
                      >
                        <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Budget updated above — scroll up to review
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </motion.div>
            );
          })}

          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl border border-purple-100 bg-white px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" />
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3.5">
              <p className="text-sm font-semibold text-red-700">Something went wrong.</p>
              <button onClick={() => clearError()} className="mt-1 text-[11px] font-bold uppercase tracking-wider text-red-700 hover:text-red-900 cursor-pointer">
                Dismiss →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); submit(input); }}
        className="border-t border-purple-100/60 bg-white/80 p-3"
      >
        <div className="flex items-center gap-2 rounded-full border border-purple-200 bg-white pl-4 pr-1.5 focus-within:border-[#8B31C7] focus-within:shadow-[0_0_0_3px_rgba(139,49,199,0.12)] transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              isBusy ? "AI is building your budget…"
              : language === "ml" ? "Budget-നെ കുറിച്ച് ചോദിക്കൂ…"
              : "Describe your wedding to build a budget…"
            }
            autoComplete="off"
            className="flex-1 bg-transparent py-3 text-sm text-[#2A1A33] placeholder:text-[#2A1A33]/40 focus:outline-none"
          />
          {isBusy ? (
            <button type="button" onClick={() => stop()} className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-50 text-[#8B31C7] hover:bg-purple-100 transition-colors cursor-pointer">
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10" rx="1.5" /></svg>
            </button>
          ) : (
            <button type="submit" disabled={!input.trim()} className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#8B31C7] to-fuchsia-500 text-white transition-all enabled:hover:shadow-[0_0_18px_rgba(139,49,199,0.4)] disabled:cursor-not-allowed disabled:bg-none disabled:bg-purple-50 disabled:text-purple-300 cursor-pointer">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3.105 3.105a1.5 1.5 0 012.122-.001l12.728 7.364a1 1 0 010 1.732L5.227 19.564a1.5 1.5 0 01-2.122-2.122L7.586 13H11a1 1 0 100-2H7.586L3.105 5.227a1.5 1.5 0 010-2.122z" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

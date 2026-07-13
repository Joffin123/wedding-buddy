"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  city: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  weddingDate: "",
  city: "",
  budget: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // This is a static demo form — in production wire this to an API route.
    console.log("[contact] submission", form);
    setSubmitted(true);
    setForm(EMPTY);
  }

  return (
    <div className="relative w-full">
      {/* HERO */}
      <section className="pt-12 pb-10 sm:pt-20 bg-gradient-to-b from-[#FFFAF0] via-[#FEF9F3] to-white relative overflow-hidden border-b border-purple-100">
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
          <Image
            src="/wedding-buddy-logo.png"
            alt=""
            width={650}
            height={650}
            className="opacity-[0.035] scale-125 object-contain"
          />
        </div>
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-rose-200/10 blur-3xl animate-wb-drift pointer-events-none" />
        <div className="absolute bottom-5 right-5 h-64 w-64 rounded-full bg-indigo-200/10 blur-3xl animate-wb-float-slow pointer-events-none" />
        <div className="wb-container text-center relative z-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8B31C7] animate-wb-fade-up">Contact Us</p>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight text-[#2A1A33] text-balance animate-wb-fade-up wb-delay-100">
            Let&apos;s plan something
            <span className="block wb-gradient-text italic animate-wb-shimmer pb-1">
              unforgettable together.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#2A1A33]/70 animate-wb-fade-up wb-delay-200">
            Tell us a little about your day. A human concierge will reply within
            24 hours with a tailored plan — or ping the AI for an instant
            shortlist.
          </p>

          {/* AI chatbot highlight */}
          <div className="mt-10 animate-wb-fade-up wb-delay-300">
            <Link
              href="/#wb-chat"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(139,49,199,0.4)] animate-wb-pulse-ring transition-all hover:-translate-y-0.5"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat with AI instead
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-24 pt-12">
        <div className="wb-container">
          <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
            {/* Info card */}
            <aside className="lg:col-span-2 space-y-4 animate-wb-fade-up">
              <div className="rounded-3xl border border-purple-100 bg-[#FEF9F3] p-7 shadow-sm">
                <h2 className="font-display text-2xl font-bold leading-tight text-[#2A1A33]">
                  Reach the Wedding Buddy team
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2A1A33]/70">
                  We read every enquiry personally. Prefer speaking? Call or
                  WhatsApp during Kerala working hours.
                </p>

                <ul className="mt-6 space-y-5">
                  {[
                    {
                      label: "WhatsApp",
                      value: "+91 98470 11234",
                      href: "https://wa.me/919847011234",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 12a9 9 0 11-3.9-7.4L21 3l-1.6 4A8.96 8.96 0 0121 12zM8 10.5c.4 1.4 1.6 2.6 3 3l1-1.5 2 1c-.3 1-1.3 1.8-2.3 1.8A5.5 5.5 0 017 9.7c0-1 .8-2 1.8-2.3l1 2L8 10.5z" />
                      ),
                      tint: "from-emerald-500 to-emerald-400",
                    },
                    {
                      label: "Email",
                      value: "concierge@weddingbuddy.in",
                      href: "mailto:concierge@weddingbuddy.in",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                      ),
                      tint: "from-rose-500 to-rose-400",
                    },
                    {
                      label: "Phone",
                      value: "+91 484 420 1234",
                      href: "tel:+914844201234",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5c0-1.1.9-2 2-2h2.5a1 1 0 011 .76l1 4a1 1 0 01-.5 1.1L7.5 10a12 12 0 006.5 6.5l1.1-1.5a1 1 0 011.1-.5l4 1a1 1 0 01.8 1V19a2 2 0 01-2 2A16 16 0 013 5z" />
                      ),
                      tint: "from-indigo-500 to-indigo-400",
                    },
                    {
                      label: "Studio",
                      value: "Panampilly Nagar, Kochi — by appointment",
                      href: "#",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17.66 16.66L13.41 20.9a2 2 0 01-2.83 0l-4.24-4.24a8 8 0 1111.31 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      ),
                      tint: "from-amber-500 to-amber-400",
                    },
                  ].map((c) => (
                    <li key={c.label} className="flex gap-4">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.tint} shadow-md`}>
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {c.icon}
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50 leading-tight">{c.label}</p>
                        <a href={c.href} className="mt-0.5 block text-sm font-semibold text-[#2A1A33] hover:text-[#8B31C7] transition-colors break-words">
                          {c.value}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-purple-100 bg-gradient-to-br from-[#F5F0FF]/40 via-white to-pink-50/40 p-7 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B31C7]">Office hours</p>
                <div className="mt-3 space-y-1.5 text-sm text-[#2A1A33]/80 leading-relaxed">
                  <p>Mon – Sat · 10:00 – 19:00 IST</p>
                  <p>Sunday · AI concierge only</p>
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  AI concierge · available 24/7
                </div>
              </div>
            </aside>

            {/* Form card */}
            <div className="lg:col-span-3 animate-wb-fade-up wb-delay-100">
              <div className="relative rounded-3xl border border-purple-100 bg-white shadow-[0_20px_50px_-20px_rgba(139,49,199,0.15)] p-2">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-7 sm:p-10">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-purple-200/20 blur-3xl animate-wb-drift" />
                  <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-200/20 blur-3xl animate-wb-float-slow" />

                  {submitted ? (
                    <div className="relative text-center py-10 animate-wb-scale-in">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg animate-wb-heart-beat">
                        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-[#2A1A33]">
                        Thank you — we&apos;ll be in touch soon.
                      </h3>
                      <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed text-[#2A1A33]/70">
                        A human concierge from the Wedding Buddy team will reply to you within 24 hours.
                        In the meantime, feel free to chat with our AI to explore options.
                      </p>
                      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                          href="/#wb-chat"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(139,49,199,0.4)] transition-all hover:-translate-y-0.5"
                        >
                          Open AI concierge
                        </Link>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-6 py-3 text-sm font-bold text-[#2A1A33] hover:border-[#8B31C7] cursor-pointer"
                        >
                          Send another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="relative grid gap-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Full name" required>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            placeholder="Aishwarya Nair"
                            className="wb-input"
                          />
                        </Field>
                        <Field label="Email" required>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder="you@example.com"
                            className="wb-input"
                          />
                        </Field>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Phone / WhatsApp">
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            placeholder="+91 98470 00000"
                            className="wb-input"
                          />
                        </Field>
                        <Field label="Wedding date (if known)">
                          <input
                            type="date"
                            value={form.weddingDate}
                            onChange={(e) => set("weddingDate", e.target.value)}
                            className="wb-input"
                          />
                        </Field>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="City / Region">
                          <input
                            type="text"
                            value={form.city}
                            onChange={(e) => set("city", e.target.value)}
                            placeholder="Kochi, Kumarakom, Munnar…"
                            className="wb-input"
                          />
                        </Field>
                        <Field label="Budget range">
                          <select
                            value={form.budget}
                            onChange={(e) => set("budget", e.target.value)}
                            className="wb-input"
                          >
                            <option value="">Select a range</option>
                            <option>Under ₹10L</option>
                            <option>₹10L – ₹25L</option>
                            <option>₹25L – ₹50L</option>
                            <option>₹50L – ₹1Cr</option>
                            <option>Above ₹1Cr</option>
                          </select>
                        </Field>
                      </div>

                      <Field label="Tell us about your dream wedding">
                        <textarea
                          rows={5}
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          placeholder="Backwater ceremony for 200 guests, pastel florals, Sadya lunch…"
                          className="wb-input resize-none"
                        />
                      </Field>

                      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-relaxed text-[#2A1A33]/55">
                          By submitting, you agree to receive a single response from the Wedding Buddy concierge. We never share your details.
                        </p>
                        <button
                          type="submit"
                          className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-7 py-3 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(139,49,199,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer"
                        >
                          Send enquiry
                          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Section Break ── */}
      <section className="pb-16 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-md group">
            <Image
              src="/images/traditional_kerala_marriage.png"
              alt="Traditional Kerala Wedding Ceremony"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300 mb-2">Heritage · Temple Ceremony</span>
              <h4 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold text-white leading-tight max-w-xl">
                Curating authentic heritage rituals across Kerala.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Local input styles */}
      <style>{`
        .wb-input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid rgba(139,49,199,0.25);
          background: #ffffff;
          padding: 0.9rem 1.15rem;
          font-size: 1rem;
          color: #2A1A33;
          line-height: 1.5;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .wb-input::placeholder { color: rgba(42,26,51,0.4); }
        .wb-input:focus {
          outline: none;
          border-color: #8B31C7;
          box-shadow: 0 0 0 5px rgba(139,49,199,0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2A1A33]/55 leading-tight">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

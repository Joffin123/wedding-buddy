// Fixed-position decorative layer with animated wedding motifs.
// Purely visual — does not capture pointer events.
export default function WeddingPattern() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft color blooms */}
      <div className="absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-rose-200/60 blur-[130px] animate-wb-drift" />
      <div className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-amber-200/50 blur-[150px] animate-wb-float-slow" />
      <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-200/50 blur-[140px] animate-wb-drift" style={{ animationDelay: "1.4s" }} />

      {/* Dotted paper grain */}
      <div
        className="absolute inset-0 wb-paper opacity-70"
        style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 78%)" }}
      />

      {/* Floating hearts */}
      <svg className="absolute top-24 left-10 h-8 w-8 text-rose-400/60 animate-wb-heart-beat" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21s-7-4.35-9.33-9.02C.67 8.17 2.88 4 6.75 4A5.5 5.5 0 0 1 12 7.25 5.5 5.5 0 0 1 17.25 4C21.12 4 23.33 8.17 21.33 11.98 19 16.65 12 21 12 21z" />
      </svg>
      <svg className="absolute top-[40%] right-12 h-6 w-6 text-rose-300/70 animate-wb-heart-beat" style={{ animationDelay: "0.9s" }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21s-7-4.35-9.33-9.02C.67 8.17 2.88 4 6.75 4A5.5 5.5 0 0 1 12 7.25 5.5 5.5 0 0 1 17.25 4C21.12 4 23.33 8.17 21.33 11.98 19 16.65 12 21 12 21z" />
      </svg>
      <svg className="absolute bottom-40 left-20 h-5 w-5 text-amber-400/70 animate-wb-heart-beat" style={{ animationDelay: "1.5s" }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21s-7-4.35-9.33-9.02C.67 8.17 2.88 4 6.75 4A5.5 5.5 0 0 1 12 7.25 5.5 5.5 0 0 1 17.25 4C21.12 4 23.33 8.17 21.33 11.98 19 16.65 12 21 12 21z" />
      </svg>

      {/* Diamond ring */}
      <svg className="absolute top-40 right-[8%] h-10 w-10 text-indigo-400/60 animate-wb-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 6l2.2 2.8h-4.4L12 6z" fill="currentColor" />
        <circle cx="12" cy="15.5" r="4.5" />
      </svg>

      {/* Sparkles */}
      <svg className="absolute top-[18%] left-[42%] h-4 w-4 text-amber-400 animate-wb-sparkle" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
      </svg>
      <svg className="absolute top-[65%] left-[8%] h-5 w-5 text-rose-400 animate-wb-sparkle" style={{ animationDelay: "0.6s" }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
      </svg>
      <svg className="absolute top-[78%] right-[22%] h-4 w-4 text-indigo-400 animate-wb-sparkle" style={{ animationDelay: "1.2s" }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
      </svg>

      {/* Flower / mandala */}
      <svg className="absolute top-[30%] left-[6%] h-14 w-14 text-rose-300/50 animate-wb-spin-slow" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="32" cy="32" r="4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse key={a} cx="32" cy="18" rx="4" ry="10" transform={`rotate(${a} 32 32)`} />
        ))}
      </svg>
      <svg className="absolute bottom-[14%] right-[6%] h-16 w-16 text-amber-300/50 animate-wb-spin-slow" style={{ animationDirection: "reverse" }} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="32" cy="32" r="4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse key={a} cx="32" cy="18" rx="4" ry="10" transform={`rotate(${a} 32 32)`} />
        ))}
      </svg>

      {/* Bells / drape */}
      <svg className="absolute top-[8%] right-[28%] h-6 w-6 text-amber-500/60 animate-wb-bob" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a1 1 0 0 1 1 1v.6a6 6 0 0 1 5 5.9V14l2 2v1H4v-1l2-2V9.5A6 6 0 0 1 11 3.6V3a1 1 0 0 1 1-1zm-1.5 17h3a1.5 1.5 0 0 1-3 0z" />
      </svg>
      <svg className="absolute bottom-[30%] left-[45%] h-5 w-5 text-rose-400/60 animate-wb-bob" style={{ animationDelay: "0.7s" }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a1 1 0 0 1 1 1v.6a6 6 0 0 1 5 5.9V14l2 2v1H4v-1l2-2V9.5A6 6 0 0 1 11 3.6V3a1 1 0 0 1 1-1zm-1.5 17h3a1.5 1.5 0 0 1-3 0z" />
      </svg>
    </div>
  );
}

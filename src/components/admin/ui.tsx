import Link from "next/link";

// ─── Shared style tokens (forms) ──────────────────────────────────────────────

export const fieldClass =
  "mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-[#111827] transition-colors focus:outline-none focus:ring-1 focus:ring-[#8B31C7] focus:border-[#8B31C7]";
export const labelClass = "text-xs font-semibold text-[#374151]";

// ─── Page header ──────────────────────────────────────────────────────────────

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#111827]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#6B7280]">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="rounded-xl bg-[#8B31C7] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7a28b0]"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

// ─── Section (groups related fields inside a form) ───────────────────────────

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-100 pt-5 first:border-t-0 first:pt-0">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

// ─── Empty state ──────────────────────────────────────────────────────────────

export function EmptyState({ message }: { message: string }) {
  return <p className="py-10 text-center text-sm text-[#9CA3AF]">{message}</p>;
}

// ─── Error banner ─────────────────────────────────────────────────────────────

export function ErrorBanner({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-red-600">{message}</p>
    </div>
  );
}

// ─── Buttons ──────────────────────────────────────────────────────────────────

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-xl bg-[#8B31C7] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7a28b0] cursor-pointer"
    >
      {children}
    </button>
  );
}

export function CancelLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#374151] transition-colors hover:bg-gray-50"
    >
      Cancel
    </Link>
  );
}

export function EditLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-[#374151] transition-colors hover:border-[#8B31C7] hover:text-[#8B31C7]"
    >
      Edit
    </Link>
  );
}

// ─── Breadcrumb-style back link ───────────────────────────────────────────────

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#6B7280] transition-colors hover:text-[#8B31C7]">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  );
}

import type { Metadata } from "next";
import { fieldClass, labelClass } from "@/components/admin/ui";
import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin Login · Wedding Buddy",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FFFAF0] via-[#FEF9F3] to-white px-4">
      <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_20px_70px_-20px_rgba(139,49,199,0.18)]">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8B31C7] text-sm font-bold text-white">
          WB
        </div>
        <h1 className="mt-4 font-display text-xl font-bold text-[#111827]">Admin sign in</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Manage venues, vendors &amp; gallery.</p>

        {error === "1" && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Incorrect username or password.
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input id="username" name="username" required autoFocus autoComplete="username" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className={fieldClass} />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-[#8B31C7] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a28b0] cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

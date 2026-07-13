import type { Metadata } from "next";
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
      <div className="w-full max-w-sm rounded-3xl border border-purple-100 bg-white p-8 shadow-[0_20px_70px_-20px_rgba(139,49,199,0.18)]">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B31C7] via-fuchsia-500 to-indigo-500 text-sm font-bold text-white shadow-md">
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
            <label htmlFor="username" className="text-xs font-semibold text-[#374151]">
              Username
            </label>
            <input
              id="username"
              name="username"
              required
              autoFocus
              autoComplete="username"
              className="mt-1 w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#8B31C7] focus:border-[#8B31C7]"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold text-[#374151]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#8B31C7] focus:border-[#8B31C7]"
            />
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

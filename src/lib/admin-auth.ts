import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "wb_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
export const ADMIN_COOKIE_MAX_AGE = SESSION_DURATION_MS / 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set — add it to .env.local");
  return secret;
}

function sign(data: string, secret: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

// Constant-time string compare — avoids leaking length/prefix via response timing.
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Stateless signed session token — no server-side session store needed.
export function createSessionToken(): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_DURATION_MS })).toString("base64url");
  const signature = sign(payload, getSecret());
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload, getSecret());
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

// Defense-in-depth check for Server Functions — Proxy guards page loads, but
// mutations must verify the session themselves (Server Functions run as POST
// requests and can be reached even if a Proxy matcher is ever narrowed).
export async function requireAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    throw new Error("Not authenticated");
  }
}

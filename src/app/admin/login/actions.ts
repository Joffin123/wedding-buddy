"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_MAX_AGE, ADMIN_COOKIE_NAME, createSessionToken, safeEqual } from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const validUsername = process.env.ADMIN_USERNAME || "";
  const validPassword = process.env.ADMIN_PASSWORD || "";

  const ok =
    validUsername.length > 0 &&
    validPassword.length > 0 &&
    safeEqual(username, validUsername) &&
    safeEqual(password, validPassword);

  if (!ok) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });

  redirect("/admin");
}

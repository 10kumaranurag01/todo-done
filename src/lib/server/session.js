"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_KEY } from "../constants/cookie.const";

/**
 * Retrieves the session token from the cookies.
 * @returns {Promise<string>} The session token.
 */
const getToken = async () => {
  const token = cookies().get(COOKIE_KEY);
  const session = token?.value;
  return session ?? "";
};

/**
 * Sets the session token in the cookies.
 * @param {string} token The session token.
 * @returns A Promise that resolves to void.
 */
const setToken = async (token) => {
  cookies().set(COOKIE_KEY, token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  // Redirect to the dashboard after logging in
  return redirect("/dashboard");
};

/**
 * Asynchronously clears the session token.
 * @returns A Promise that resolves to void.
 */
const clearToken = async () => {
  cookies().delete(COOKIE_KEY);
  return redirect("/auth/login");
};

export { getToken, setToken, clearToken };

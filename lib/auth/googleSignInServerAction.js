"use server";

import { signIn } from "@/app/api/auth/[...nextauth]/route.js";

export const handleGoogleSignIn = async () => {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    throw error;
  }
};
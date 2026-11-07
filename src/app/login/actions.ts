"use server";

import { cookies } from "next/headers";
import { getUserByEmail, verifyPassword } from "@/lib/auth";

export async function loginAction(email:string, password:string) {
    const user = await getUserByEmail(email);

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "E-mail ou senha inválidos" };
    }

    if (user.mustChangePassword) {
    const cookieStore = await cookies();
    cookieStore.set("pending_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10,
      path: "/",
    });
    return { redirect: "/change-password" };
  }

    return { redirect: "/dashboard" };
}
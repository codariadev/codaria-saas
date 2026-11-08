"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, getUserByEmail, verifyPassword, createSession } from "@/lib/auth";

export async function changePasswordAction(email:string, currentPassword:string, newPassword:string) {
    const user = await getUserByEmail(email);

    if (!user) {
        return { error : "Usuário não encontrado"};
    }

    const isValid = await verifyPassword(currentPassword, user.passwordHash);

    if (!isValid) {
        return { error: "Senha atual incorreta"};
    }

    const newHash = await hashPassword(newPassword);

    await db.update(users).set({
        passwordHash: newHash,
        mustChangePassword: false,
    })
    .where(eq(users.id, user.id));
await createSession(user.id);
return { success: true }
}
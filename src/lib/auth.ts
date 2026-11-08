import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function hashPassword(password:string) {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password:string, hash: string) {
    return bcrypt.compare(password, hash);
}

export async function getUserByEmail(email:string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user ?? null;
}

export async function createUser(email:string, password:string, name?:string) {
    const passwordHash = await hashPassword(password);
    const [user] = await db
        .insert(users)
        .values({
            email,
            passwordHash,
            name,
            mustChangePassword: true,
        })
        .returning();
    return user;
}

export async function createSession(userId:string) {
    const cookieStore = await cookies();
    cookieStore.set("session", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    return cookieStore.get("session")?.value ?? null;
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
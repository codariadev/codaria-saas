import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

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
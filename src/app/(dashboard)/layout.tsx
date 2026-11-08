import { redirect } from "next/navigation";
import { getSession, destroySession } from "@/lib/auth";

export default async function DashboardLayout({children}:{children: React.ReactNode;}) {
    const session = await getSession();

    if (!session) {
        redirect("/login")
    }

    async function logout() {
        "use server";
        await destroySession();
        redirect("/login");
    }

    return (
        <div className="min-h-screen">
        <header className="flex items-center justify-between border-b px-6 py-4">
            <h1 className="text-lg font-semibold">Codaria SaaS</h1>
            <form action={logout}>
            <button
                type="submit"
                className="text-sm text-muted-foreground hover:underline"
            >
                Sair
            </button>
            </form>
        </header>
        <main className="p-6">{children}</main>
        </div>
    );
}
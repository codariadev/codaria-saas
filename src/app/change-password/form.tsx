"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { changePasswordAction } from "./actions";

export default function ChangePasswordForm({ email }: { email: string }) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await changePasswordAction(email, currentPassword, newPassword);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg border bg-card p-6 shadow-sm"
      >
        <h1 className="text-center text-2xl font-semibold">Trocar senha</h1>
        <p className="text-center text-sm text-muted-foreground">
          Defina uma nova senha para continuar.
        </p>

        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">E-mail</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-md border bg-muted px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="current" className="text-sm font-medium">
            Senha atual
          </label>
          <input
            id="current"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="new" className="text-sm font-medium">
            Nova senha
          </label>
          <input
            id="new"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar nova senha"}
        </button>
      </form>
    </div>
  );
}
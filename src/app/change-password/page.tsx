import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChangePasswordForm from "./form";

export default async function ChangePasswordPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("pending_email")?.value;

  if (!email) {
    redirect("/login");
  }

  return <ChangePasswordForm email={email} />;
}
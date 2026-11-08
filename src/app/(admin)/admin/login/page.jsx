import { AdminLogin } from "@/admin/AdminProviders";
import { currentUser } from "@/auth/session.js";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  if (await currentUser()) redirect("/admin/dashboard");
  return <AdminLogin />;
}


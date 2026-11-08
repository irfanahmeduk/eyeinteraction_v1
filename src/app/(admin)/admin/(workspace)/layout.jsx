import { AdminWorkspace } from "@/admin/AdminProviders";
import { currentUser } from "@/auth/session.js";
import { redirect } from "next/navigation";
export default async function WorkspaceLayout({ children }) {
  if (!await currentUser()) redirect("/admin/login");
  return <AdminWorkspace>{children}</AdminWorkspace>;
}


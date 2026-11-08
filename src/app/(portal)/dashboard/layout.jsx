import { PortalShell } from "@/components/portal/PortalShell";
import { sampleUser } from "@/lib/portal/sample-user";

// PREVIEW: uses sample data. After Google sign-in is connected, this layout will
// load the signed-in user and send visitors without a session to the sign-in screen.
export default function DashboardLayout({ children }) {
  return <PortalShell user={sampleUser.google}>{children}</PortalShell>;
}

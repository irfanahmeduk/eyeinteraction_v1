import Link from "next/link";
export default function NotFound() {
  return <main className="admin-loading"><h1>Admin page not found</h1><Link href="/admin/dashboard">Back to dashboard</Link></main>;
}


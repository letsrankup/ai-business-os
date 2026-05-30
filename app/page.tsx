import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        AI Business OS
      </h1>

      <p className="mt-4 text-center">
        Website Audit, CRM, Leads, Content Generator & Proposal System
      </p>

      <Link
        href="/dashboard"
        className="mt-6 px-6 py-3 border rounded"
      >
        Open Dashboard
      </Link>
    </main>
  );
}

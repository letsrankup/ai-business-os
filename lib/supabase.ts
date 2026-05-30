import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// ─── Browser Client (use in Client Components) ────────────────────────────────
export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ─── Server Client (use in Server Components / API Routes) ────────────────────
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// ─── Database helpers ─────────────────────────────────────────────────────────

// Save audit result
export async function saveAudit(userId: string, url: string, result: object) {
  const supabase = createClient();
  return supabase.from("audits").insert({ user_id: userId, url, result });
}

// Get user's audits
export async function getUserAudits(userId: string) {
  const supabase = createClient();
  return supabase
    .from("audits")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);
}

// Save generated content
export async function saveContent(userId: string, contentType: string, topic: string, content: string) {
  const supabase = createClient();
  return supabase.from("content").insert({ user_id: userId, content_type: contentType, topic, content });
}

// Save lead
export async function saveLead(userId: string, lead: object) {
  const supabase = createClient();
  return supabase.from("leads").insert({ user_id: userId, ...lead });
}

// Get CRM clients
export async function getClients(userId: string) {
  const supabase = createClient();
  return supabase
    .from("clients")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

// Add client to CRM
export async function addClient(userId: string, client: object) {
  const supabase = createClient();
  return supabase.from("clients").insert({ user_id: userId, ...client });
                                    }

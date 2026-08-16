import { createClient } from "@supabase/supabase-js";

let client = null;

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey || !url.startsWith("http")) {
    throw new Error(
      "Supabase isn't configured yet. Add your real SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local."
    );
  }

  if (!client) {
    client = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }

  return client;
}

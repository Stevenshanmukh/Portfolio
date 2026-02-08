import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (uses anon key for public reads).
 * Creates a new instance per call to avoid shared state between requests.
 * Used in server components and API routes.
 */
export function createServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

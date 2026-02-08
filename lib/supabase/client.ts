import { createClient } from "@supabase/supabase-js";

/**
 * Browser-side Supabase client (uses anon key).
 * Used in client components: admin panel, auth, image uploads.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

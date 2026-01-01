import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a safe client that won't throw on initialization
let supabaseClient: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a dummy client that won't crash the app
  // This allows the app to build even without env vars
  supabaseClient = createClient(
    "https://placeholder.supabase.co",
    "placeholder-key"
  );
}

export const supabase = supabaseClient;
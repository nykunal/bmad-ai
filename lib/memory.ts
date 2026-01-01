import { supabase } from "./supabase";

export async function saveMemory(text: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase not configured, skipping memory save");
    return;
  }

  try {
    await supabase.from("memory").insert({
      content: text,
    });
  } catch (error) {
    console.error("Failed to save memory:", error);
  }
}

export async function readMemory() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase not configured, returning empty memory");
    return "";
  }

  try {
    const { data } = await supabase
      .from("memory")
      .select("content")
      .order("created_at", { ascending: true });

    return data?.map((d) => d.content).join("\n") || "";
  } catch (error) {
    console.error("Failed to read memory:", error);
    return "";
  }
}
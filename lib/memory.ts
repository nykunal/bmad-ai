import { supabase } from "./supabase";

export async function saveMemory(text: string) {
  await supabase.from("memory").insert({ content: text });
}

export async function readMemory() {
  const { data } = await supabase
    .from("memory")
    .select("content")
    .order("created_at", { ascending: true });

  return data?.map((d) => d.content).join("\n") || "";
}

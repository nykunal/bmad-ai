import { readMemory, saveMemory } from "./memory";

export async function runBMAD(input: string, stage: string) {
  const { callLLM } = await import("@/lib/lib/llm");

  const past = await readMemory();

  const prompt = `
You are applying the BMAD method.

Past context:
${past}

Current stage:
${stage}

User input:
${input}

Respond clearly and concisely.
`;

  const result = await callLLM(prompt);
  await saveMemory(result || "");

  return result;
}
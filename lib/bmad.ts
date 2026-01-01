import { callLLM } from "@/lib/lib/llm";
import { saveMemory, readMemory } from "./memory";

export async function runBMAD(input: string, stage: string) {
  const past = await readMemory();

  const prompt = `
You are using the BMAD method.

Past context:
${past}

Current stage:
${stage}

User input:
${input}

Respond clearly for this stage.
`;

  const result = await callLLM(prompt);
  await saveMemory(result || "");

  return result;
}

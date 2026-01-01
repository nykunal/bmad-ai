export async function runBMAD(input: string, stage: string) {
  // Import ONLY at runtime
  const { callLLM } = await import("./lib/llm");

  const prompt = `
You are applying the BMAD method.

Stage:
${stage}

User input:
${input}

Respond clearly and concisely.
`;

  return await callLLM(prompt);
}

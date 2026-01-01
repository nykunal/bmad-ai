import { VasperaMemory } from "vasperamemory-sdk";

export const memory = new VasperaMemory({
  apiKey: process.env.VASPERA_API_KEY!,
  projectId: process.env.VASPERA_PROJECT_ID!,
});

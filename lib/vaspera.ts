import { VasperaMemory } from "vasperamemory-sdk";

// Only initialize if API key exists
let memory: VasperaMemory | null = null;

if (process.env.VASPERA_API_KEY && process.env.VASPERA_PROJECT_ID) {
  try {
    memory = new VasperaMemory({
      apiKey: process.env.VASPERA_API_KEY,
      projectId: process.env.VASPERA_PROJECT_ID,
    });
  } catch (error) {
    console.error("Failed to initialize VasperaMemory:", error);
  }
}

export { memory };
"use client";

import { useState } from "react";
import Sidebar from "@/components/components/Sidebar";
import { BMAD_STAGES } from "@/lib/bmadStages";

export default function Home() {
  const [stageIndex, setStageIndex] = useState(0);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const stage = BMAD_STAGES[stageIndex];

  async function runStage() {
    try {
      const res = await fetch("/api/bmad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, stage }),
      });
      
      if (!res.ok) {
        throw new Error("API request failed");
      }
      
      const data = await res.json();
      setOutput(data.result || "No response");
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  function nextStage() {
    setInput("");
    setOutput("");
    setStageIndex(stageIndex + 1);
  }

  return (
    <>
      <Sidebar currentStageIndex={stageIndex} />

      <section className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2">{stage}</h2>
        <p className="text-sm text-gray-600 mb-4">
          Provide input for this BMAD stage.
        </p>

        <textarea
          className="w-full border rounded p-3 min-h-[120px]"
          placeholder={`Enter details for ${stage}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={runStage}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Run Stage
          </button>

          {stageIndex < BMAD_STAGES.length - 1 && (
            <button
              onClick={nextStage}
              className="border px-4 py-2 rounded"
            >
              Next Stage →
            </button>
          )}
        </div>

        {output && (
          <div className="mt-6 bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">AI Output</h3>
            <pre className="whitespace-pre-wrap text-sm">
              {output}
            </pre>
          </div>
        )}
      </section>
    </>
  );
}

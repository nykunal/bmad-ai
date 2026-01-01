import { BMAD_STAGES } from "@/lib/bmadStages";

export default function Sidebar({
  currentStageIndex,
}: {
  currentStageIndex: number;
}) {
  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="text-sm font-semibold mb-4">BMAD Stages</h2>

      <ul className="space-y-2">
        {BMAD_STAGES.map((stage, index) => (
          <li
            key={stage}
            className={`text-sm p-2 rounded ${
              index === currentStageIndex
                ? "bg-black text-white"
                : "text-gray-700"
            }`}
          >
            {stage}
          </li>
        ))}
      </ul>
    </aside>
  );
}

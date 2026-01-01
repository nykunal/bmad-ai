import { runBMAD } from "@/lib/bmad";

export async function POST(req: Request) {
  const { input, stage } = await req.json();
  const result = await runBMAD(input, stage);
  return Response.json({ result });
}

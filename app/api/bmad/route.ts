export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { input, stage } = await req.json();

  const { runBMAD } = await import("@/lib/bmad");

  const result = await runBMAD(input, stage);
  return Response.json({ result });
}

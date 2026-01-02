export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { input, stage } = await req.json();

    if (!input || !stage) {
      return Response.json(
        { error: "Missing input or stage" },
        { status: 400 }
      );
    }

    const { runBMAD } = await import("@/lib/bmad");
    const result = await runBMAD(input, stage);
    
    return Response.json({ result: result || "No response" });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
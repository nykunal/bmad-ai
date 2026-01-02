import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("API HIT:", body);

    if (!body || !body.input) {
      return NextResponse.json(
        { error: "Input missing" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      output: `BMAD processed this input:\n\n${body.input}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

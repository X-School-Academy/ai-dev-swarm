import { NextRequest, NextResponse } from "next/server";
import { toggleSkip } from "@/server/stages";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const skip = body.skip as boolean;
    const result = toggleSkip(id, skip);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to toggle skip";
    const status = message.includes("not found") ? 404 : message.includes("not skippable") ? 400 : 500;
    return NextResponse.json({ detail: message }, { status });
  }
}

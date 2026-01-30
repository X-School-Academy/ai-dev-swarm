import { NextRequest, NextResponse } from "next/server";
import { listStageFiles } from "@/server/stages";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const files = listStageFiles(id);
    return NextResponse.json(files);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to list files";
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ detail: message }, { status });
  }
}

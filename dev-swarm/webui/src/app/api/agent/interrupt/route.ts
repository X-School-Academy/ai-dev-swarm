import { NextResponse } from "next/server";
import { interruptRun } from "@/server/agent";

export async function POST() {
  try {
    const run = interruptRun();
    return NextResponse.json({ runId: run?.id, status: run?.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to interrupt";
    return NextResponse.json({ detail: message }, { status: 409 });
  }
}

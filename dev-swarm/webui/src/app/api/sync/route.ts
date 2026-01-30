import { NextResponse } from "next/server";
import { listStages } from "@/server/stages";

export async function GET() {
  try {
    const stages = listStages();
    return NextResponse.json({
      stages,
      syncedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { detail: err instanceof Error ? err.message : "Sync failed" },
      { status: 500 }
    );
  }
}

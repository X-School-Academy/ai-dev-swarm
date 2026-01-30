import { NextResponse } from "next/server";
import { listStages } from "@/server/stages";

export async function GET() {
  try {
    return NextResponse.json(listStages());
  } catch (err) {
    return NextResponse.json(
      { detail: err instanceof Error ? err.message : "Failed to list stages" },
      { status: 500 }
    );
  }
}

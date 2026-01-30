import { NextResponse } from "next/server";
import { getAgents } from "@/server/agent";

export async function GET() {
  try {
    return NextResponse.json(getAgents());
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load agents";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}

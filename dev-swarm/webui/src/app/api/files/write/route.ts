import { NextRequest, NextResponse } from "next/server";
import { writeDocument } from "@/server/documents";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path: filePath, content } = body;
    if (!filePath || content === undefined) {
      return NextResponse.json({ detail: "path and content are required" }, { status: 400 });
    }
    const doc = writeDocument(filePath, content);
    return NextResponse.json(doc);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to write document";
    const status = message.includes("not found")
      ? 404
      : message.includes("not allowed") || message.includes("must target")
        ? 403
        : 400;
    return NextResponse.json({ detail: message }, { status });
  }
}

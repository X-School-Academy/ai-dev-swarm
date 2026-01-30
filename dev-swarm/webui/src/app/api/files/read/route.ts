import { NextRequest, NextResponse } from "next/server";
import { readDocument } from "@/server/documents";

export async function GET(request: NextRequest) {
  try {
    const filePath = request.nextUrl.searchParams.get("path");
    if (!filePath) {
      return NextResponse.json({ detail: "path parameter is required" }, { status: 400 });
    }
    const doc = readDocument(filePath);
    return NextResponse.json(doc);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read document";
    const status = message.includes("not found")
      ? 404
      : message.includes("not allowed") || message.includes("must target")
        ? 403
        : 400;
    return NextResponse.json({ detail: message }, { status });
  }
}

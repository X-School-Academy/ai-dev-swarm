import { NextRequest, NextResponse } from "next/server";
import { deleteDocument } from "@/server/documents";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { path: filePath } = body;
    if (!filePath) {
      return NextResponse.json({ detail: "path is required" }, { status: 400 });
    }
    deleteDocument(filePath);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete document";
    const status = message.includes("not found")
      ? 404
      : message.includes("cannot be deleted") || message.includes("must target")
        ? 403
        : 400;
    return NextResponse.json({ detail: message }, { status });
  }
}

import { NextRequest } from "next/server";
import { readDocument } from "@/server/documents";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const filePath = path.join("/");
    if (!filePath.toLowerCase().endsWith(".html")) {
      return new Response("Only HTML files are supported", { status: 400 });
    }
    const doc = readDocument(filePath);
    if (doc.contentType !== "text/html") {
      return new Response("Only HTML files are supported", { status: 400 });
    }
    return new Response(doc.content, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load HTML";
    const status = message.includes("not found")
      ? 404
      : message.includes("not allowed") || message.includes("must target")
        ? 403
        : 400;
    return new Response(message, { status });
  }
}

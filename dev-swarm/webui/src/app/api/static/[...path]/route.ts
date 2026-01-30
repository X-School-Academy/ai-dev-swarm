import { NextRequest } from "next/server";
import { readAsset } from "@/server/documents";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const filePath = path.join("/");
    const asset = readAsset(filePath);
    return new Response(asset.content, {
      status: 200,
      headers: {
        "Content-Type": asset.contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load asset";
    const status = message.includes("not found")
      ? 404
      : message.includes("not allowed") || message.includes("must target")
        ? 403
        : 400;
    return new Response(message, { status });
  }
}

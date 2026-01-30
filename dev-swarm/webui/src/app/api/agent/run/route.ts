import { NextRequest, NextResponse } from "next/server";
import { startRun, isRunActive, getRunEvents, isRunFinished } from "@/server/agent";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stageId, prompt, agentId } = body;

    if (!stageId || !prompt) {
      return NextResponse.json(
        { detail: "stageId and prompt are required" },
        { status: 400 }
      );
    }

    if (isRunActive()) {
      return NextResponse.json(
        { detail: "A run is already active" },
        { status: 409 }
      );
    }

    const run = startRun(stageId, prompt, agentId || "claude");
    return NextResponse.json({ runId: run.id, status: run.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to start agent";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}

// SSE streaming endpoint for run events
export async function GET(request: NextRequest) {
  const runId = request.nextUrl.searchParams.get("runId");
  if (!runId) {
    return NextResponse.json({ detail: "runId is required" }, { status: 400 });
  }

  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      let lastIndex = 0;

      const poll = () => {
        if (closed) return;

        const events = getRunEvents(runId);
        const finished = isRunFinished(runId);

        if (lastIndex < events.length) {
          for (let i = lastIndex; i < events.length; i++) {
            const event = events[i];
            const data = JSON.stringify(event);
            controller.enqueue(
              encoder.encode(`event: ${event.category}\ndata: ${data}\n\n`)
            );
          }
          lastIndex = events.length;
        }

        if (finished && lastIndex >= events.length) {
          closed = true;
          controller.close();
          return;
        }

        setTimeout(poll, 200);
      };

      poll();
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

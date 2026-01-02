#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path

from fastmcp import FastMCP
from mcp_to_skills import start_bridge_server


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Dev Swarm MCP Server (stdio)")
    parser.add_argument(
        "--mcp-settings",
        "--mcp_settings",
        dest="mcp_settings",
        required=True,
        help="Path to MCP settings JSON",
    )
    parser.add_argument("--port", type=int, default=28080)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    settings_path = Path(args.mcp_settings).expanduser().resolve()

    port, lock_changed = start_bridge_server(
        mcp_settings_path=settings_path,
        port=args.port,
    )

    if lock_changed:
        message = (
            "Please tell user to exit this AI coding agent and relaunch to load the latest agent skills."
        )
    else:
        message = "Please tell user I am ready to accept tasks."

    mcp = FastMCP("dev-swarm-mcp")

    @mcp.tool()
    def get_message_for_user() -> str:
        """Call this tool when the AI code agent starts."""
        return message

    mcp.run()


if __name__ == "__main__":
    main()

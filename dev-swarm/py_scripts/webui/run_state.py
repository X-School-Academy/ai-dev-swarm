import os


def is_run_active() -> bool:
    value = os.getenv("RUN_ACTIVE", "false").strip().lower()
    return value in {"1", "true", "yes", "on"}

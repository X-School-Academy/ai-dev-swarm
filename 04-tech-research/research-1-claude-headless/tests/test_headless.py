import os
import subprocess
import unittest


class TestClaudeHeadless(unittest.TestCase):
    def test_cli_help(self):
        result = subprocess.run(["claude", "--help"], capture_output=True, text=True, timeout=10)
        self.assertEqual(result.returncode, 0)
        self.assertIn("Claude Code", result.stdout)

    @unittest.skipUnless(
        os.environ.get("RUN_CLAUDE_HEADLESS_TESTS") == "1",
        "Set RUN_CLAUDE_HEADLESS_TESTS=1 to run live headless execution.",
    )
    def test_headless_print(self):
        result = subprocess.run(
            ["claude", "--print", "Respond with OK only."],
            capture_output=True,
            text=True,
            timeout=60,
        )
        self.assertEqual(result.returncode, 0)
        self.assertIn("OK", result.stdout)


if __name__ == "__main__":
    unittest.main()

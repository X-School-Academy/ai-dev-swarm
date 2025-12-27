Refer to dev-swarms/py_scripts/screen_stream.py and dev-swarms/skills/dev-swarms-screen-snapshot/SKILL.md. Create a use computer skill by creating a Python script at dev-swarms/py_scripts/use_computer.py using the packages `pyautogui` and `screeninfo`.

use_computer.py accepts --json_str as input and prints a string wrapped in <output>{}</output> to return a JSON string as the return value.

--json_str can be:

1. Get screen info, return screen size and monitor count.
2. Get a screenshot for a bounding box with a scale factor.
   It will return an image at /{os_tmp_path}/use_computer_{uuid}.png, scaled by the scale factor.
3. Actions: move the mouse, click, and type text with a time sequence.

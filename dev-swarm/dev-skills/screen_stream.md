### Skill: screen-snapshot

When an AI agent needs to inspect a mobile app, an iOS/Android simulator, or any specific part of the screen, it should use this skill.

Run the following shell command to start a background process:
`dev-swarm/py_scripts/screen_stream.py --monitor -1 --background --fps 30 --host 127.0.0.1 --port 9090`

Then, use the URL `http://127.0.0.1:9090/snapshot.png` to retrieve the screen snapshot.

Once `screen_stream` is running in the background, the AI agent should instruct the user as follows:

1. Move and resize the light gray window to cover the area you want the AI agent to see. Then, place the mobile app, simulator, or target screen area on top of this window so that only this region is captured.
2. You can verify the snapshot area by visiting `http://127.0.0.1:9090` for a live preview.
3. You may close the preview web page once you have confirmed the capture area.

The AI agent uses `http://127.0.0.1:9090/snapshot.png` to view UI elements for debugging or troubleshooting.


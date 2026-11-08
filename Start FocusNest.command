#!/bin/bash
# =====================================================================
# Start FocusNest — double-click this file (Mac).
# It starts FocusNest's small local server and opens the website in your
# browser. Opening it this way is what makes the natural (human-sounding)
# Read-aloud voice work — opening index.html directly cannot run it.
# Keep this window open while you study; close it to stop FocusNest.
# =====================================================================
cd "$(dirname "$0")" || exit 1
PORT=8080
URL="http://localhost:$PORT"

# Find Node.js (needed to run the server).
NODE="$(command -v node)"
for p in /opt/homebrew/bin/node /usr/local/bin/node "$HOME/.nvm/versions/node"/*/bin/node; do [ -z "$NODE" ] && [ -x "$p" ] && NODE="$p"; done
if [ -z "$NODE" ]; then
  echo "Node.js is not installed. Download it free from https://nodejs.org (LTS), then double-click this file again."
  open "https://nodejs.org"
  read -r -p "Press Enter to close…"; exit 1
fi

# Already running? Just open the browser.
if curl -s -o /dev/null "$URL/index.html"; then open "$URL"; exit 0; fi

echo "Starting FocusNest at $URL …"
( sleep 1; open "$URL" ) &
exec "$NODE" server.js

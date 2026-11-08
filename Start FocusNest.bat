@echo off
REM Start FocusNest - double-click this file (Windows).
REM Starts the small local server and opens the website, which is what makes
REM the natural Read-aloud voice work. Keep this window open while you study.
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is not installed. Get it free from https://nodejs.org then run this again. & start https://nodejs.org & pause & exit /b 1)
start "" http://localhost:8080
node server.js

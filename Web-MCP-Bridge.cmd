@echo off
title Web MCP Bridge
cd /d "%~dp0"
python "%~dp0server\mcp_ws_bridge.py" --config "%~dp0server\servers.json"
pause

# Web MCP Bridge (English UI + 18 AI Platforms)

> Built on top of the open-source [AstraxOf/web-mcp-bridge](https://github.com/AstraxOf/web-mcp-bridge) (MIT License).  
> Additions: **Full English UI & Prompts** + **Support for 18 AI web chat platforms** + **Foreground Desktop Launcher (`Web-MCP-Bridge.cmd`)**.

Connect **free web AI chats** (no API keys required) to **local MCP servers** on your computer (such as [Desktop Commander](https://github.com/wonderwhy-er/DesktopCommanderMCP)) so the AI can read/write files and run terminal commands.

---

## Supported Platforms (18 Websites)

| Category | Platforms |
|---|---|
| **Core (Full Support)** | ChatGPT (`chatgpt.com`), Gemini (`gemini.google.com`), Claude (`claude.ai`), DeepSeek (`chat.deepseek.com`) |
| **Asia / Open Models** | Qwen (`chat.qwen.ai`), Kimi (`kimi.com`, `kimi.moonshot.cn`), Z.ai / GLM (`chat.z.ai`) |
| **Copilot & Meta** | Microsoft Copilot (`copilot.microsoft.com`), GitHub Copilot (`github.com/copilot`), Meta AI (`meta.ai`) |
| **Free / Multi-Model** | Google AI Studio (`aistudio.google.com`), Grok (`grok.com`), Perplexity (`perplexity.ai`), Mistral Le Chat (`chat.mistral.ai`), OpenRouter (`openrouter.ai`), Poe (`poe.com`), HuggingChat (`huggingface.co/chat`), T3 Chat (`t3.chat`), NotebookLM (`notebooklm.google.com`) |

---

## Prerequisites

1. **Python 3.9+** (check *Add Python to PATH* during setup)
2. **Node.js 18+** (for Node-based MCP servers such as `desktop-commander` or `server-filesystem`)
3. **Chromium Browser** (Brave, Google Chrome, or Microsoft Edge 116+)

---

## Installation (One-Time Setup)

### 1. Clone the repository
```bash
git clone https://github.com/Phurin123/web-mcp-bridge.git
cd web-mcp-bridge
```
*(Keep this folder in a permanent location — do not move or delete it after loading it into your browser.)*

### 2. Install Python dependency & Desktop Commander
```bash
pip install -r server/requirements.txt
npm install -g @wonderwhy-er/desktop-commander
```

### 3. Create `server/servers.json`
Create `server/servers.json` (see `server/servers.example.json`). Example with **Desktop Commander** (port `8091` to avoid conflicts with Docker on `8080–8082`):

```json
{
  "servers": [
    {
      "name": "desktop-commander",
      "port": 8091,
      "command": [
        "desktop-commander.cmd"
      ]
    },
    {
      "name": "demo",
      "port": 8090,
      "command": [
        "python",
        "server/examples/demo_mcp_server.py"
      ]
    }
  ]
}
```
> **Tip:** If `desktop-commander.cmd` is not resolved on your system, use `"node", "C:/path/to/node_modules/@wonderwhy-er/desktop-commander/dist/index.js"` or `"npx.cmd", "-y", "@wonderwhy-er/desktop-commander"` (always use `/` in paths).

### 4. Desktop Launcher (`Web-MCP-Bridge.cmd`)
Copy `Web-MCP-Bridge.cmd` (or create a shortcut to it) onto your **Desktop**.  
- Double-click to start the bridge in a terminal window with live logs.
- **Closing the terminal window stops the bridge immediately** (nothing stays running in the background).

### 5. Load the Extension in Brave / Chrome / Edge
1. Open `brave://extensions` (or `chrome://extensions` / `edge://extensions`).
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select the `web-mcp-bridge` folder (the one containing `manifest.json`).
4. Pin the **Web MCP Bridge** icon to your browser toolbar.

---

## Usage

1. **Start the Bridge:** Double-click **`Web-MCP-Bridge.cmd`** and keep the terminal window open while using it.
2. **Enable MCP Server:**
   - Click the **Web MCP Bridge** icon → **Servers** tab → verify green dot (`Bridge connected`).
   - Toggle **`desktop-commander`** ON.
3. **Choose Permission Mode:**
   - **`Ask every time` (Recommended):** Prompts you (`Allow` / `Deny`) before running any local tool.
   - **`Allow always` (Auto-Agent Mode):** Automatically executes tools and submits results back to the AI until the task finishes *(use only for trusted tasks)*.
4. **Chat:** Open any supported AI website and ask a question (e.g. `List the files on my Desktop`).

---

## Development & Checks

```bash
npm run check   # Validate all JS files and manifest.json
npm test        # Run all unit tests
```

## License & Credit

- Original project: [AstraxOf/web-mcp-bridge](https://github.com/AstraxOf/web-mcp-bridge) (MIT License)
- License: [MIT](LICENSE)

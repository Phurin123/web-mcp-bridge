# Web MCP Bridge (English UI + 18+ AI Platforms)

> ต่อยอดจากโปรเจกต์โอเพ่นซอร์ส [AstraxOf/web-mcp-bridge](https://github.com/AstraxOf/web-mcp-bridge) (MIT License)  
> ปรับแต่งเพิ่มเติม: **แปล UI เป็นภาษาอังกฤษ** + **เพิ่มการรองรับเว็บแชท AI ยอดนิยมกว่า 18 แพลตฟอร์ม** + **สคริปต์รันบน Desktop (`Web-MCP-Bridge.cmd`)**

เชื่อม **เว็บแชท AI ฟรี** (ไม่ต้องใช้ API Key) เข้ากับ **MCP Servers ในคอมพิวเตอร์ของคุณ** (เช่น [Desktop Commander](https://github.com/wonderwhy-er/DesktopCommanderMCP)) เพื่อให้อ่าน/เขียนไฟล์ และรันคำสั่งเทอร์มินัลได้จริง

---

## 🌐 แพลตฟอร์มที่รองรับ (18 เว็บไซต์)

| กลุ่ม | แพลตฟอร์ม |
|---|---|
| **ต้นฉบับ (Full Support)** | ChatGPT (`chatgpt.com`), Gemini (`gemini.google.com`), Claude (`claude.ai`), DeepSeek (`chat.deepseek.com`) |
| **เอเชีย / โมเดลเปิด** | Qwen (`chat.qwen.ai`), Kimi (`kimi.com`, `kimi.moonshot.cn`), Z.ai / GLM (`chat.z.ai`) |
| **Copilot & Meta** | Microsoft Copilot (`copilot.microsoft.com`), GitHub Copilot (`github.com/copilot`), Meta AI (`meta.ai`) |
| **ฟรี / รวมโมเดล** | Google AI Studio (`aistudio.google.com`), Grok (`grok.com`), Perplexity (`perplexity.ai`), Mistral Le Chat (`chat.mistral.ai`), OpenRouter (`openrouter.ai`), Poe (`poe.com`), HuggingChat (`huggingface.co/chat`), T3 Chat (`t3.chat`), NotebookLM (`notebooklm.google.com`) |

---

## ✅ สิ่งที่ต้องมีในเครื่อง

1. **Python 3.9+** (เลือก *Add Python to PATH* ตอนติดตั้ง)
2. **Node.js 18+** (สำหรับรัน MCP Server เช่น `desktop-commander` หรือ `filesystem`)
3. **เบราว์เซอร์ Chromium** (Brave, Google Chrome หรือ Microsoft Edge เวอร์ชัน 116+)

---

## 🚀 วิธีติดตั้งและตั้งค่า (ทำครั้งเดียว)

### 1. โคลนโปรเจกต์
```bash
git clone https://github.com/Phurin123/web-mcp-bridge.git
cd web-mcp-bridge
```
*(เก็บไว้ในโฟลเดอร์ถาวร ห้ามย้ายหรือลบหลังโหลดเข้าเบราว์เซอร์)*

### 2. ติดตั้ง Python dependency และ MCP Server
```bash
pip install -r server/requirements.txt
npm install -g @wonderwhy-er/desktop-commander
```

### 3. สร้างไฟล์ตั้งค่า `server/servers.json`
สร้างไฟล์ `server/servers.json` (อ้างอิงจาก `server/servers.example.json`) ตัวอย่างสำหรับ **Desktop Commander** (พอร์ต `8091` เพื่อเลี่ยงพอร์ต 8080–8082 ที่มักชนกับ Docker):

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
> **หมายเหตุ:** หาก `desktop-commander.cmd` ไม่ทำงานบนเครื่อง ให้ใช้ `"node", "C:/path/to/node_modules/@wonderwhy-er/desktop-commander/dist/index.js"` หรือ `"npx.cmd", "-y", "@wonderwhy-er/desktop-commander"` แทน (ใช้ `/` ใน path)

### 4. สร้างทางลัดรันบน Desktop
คัดลอกไฟล์ `Web-MCP-Bridge.cmd` (หรือคลิกขวา → *Create shortcut*) ไปวางไว้ที่หน้า **Desktop**  
*(หรือสร้างไฟล์ `.cmd` บน Desktop ให้เรียก `call "C:\path\to\web-mcp-bridge\Web-MCP-Bridge.cmd"`)*

การทำงานของ `Web-MCP-Bridge.cmd`:
- ดับเบิลคลิกเพื่อเปิด Bridge ในหน้าต่าง Terminal พร้อมแสดง Log แบบเรียลไทม์
- **เมื่อปิดหน้าต่าง Terminal ตัว Bridge จะปิดตามทันที** (ไม่รันค้างในพื้นหลัง)

### 5. โหลด Extension เข้าเบราว์เซอร์ (Brave / Chrome / Edge)
1. เปิด `brave://extensions` (หรือ `chrome://extensions` / `edge://extensions`)
2. เปิด **Developer mode** (มุมขวาบน)
3. กด **Load unpacked** แล้วเลือกโฟลเดอร์ `web-mcp-bridge` (โฟลเดอร์ที่มีไฟล์ `manifest.json`)
4. แนะนำปักหมุดไอคอน Extension (รูปสะพาน) ไว้ที่แถบเครื่องมือ

---

## 🎯 วิธีใช้งาน

1. **เปิด Bridge:** ดับเบิลคลิก **`Web-MCP-Bridge.cmd`** เปิดหน้าต่างค้างไว้ระหว่างใช้งาน
2. **เปิด MCP Server ใน Extension:**
   - กดไอคอน **Web MCP Bridge** → แท็บ **Servers** → ตรวจสอบจุดเขียว (`Bridge connected`)
   - เปิดสวิตช์ **`desktop-commander`** ให้ขึ้นสีเขียว
3. **เลือกโหมดสิทธิ์ (Permission):**
   - **`Ask every time` (แนะนำ):** ถามยืนยัน (`Allow` / `Deny`) ก่อนรันคำสั่งในคอมทุกครั้ง
   - **`Allow always` (โหมด Auto-Agent):** AI เรียก tool → รันบนเครื่อง → ส่งผลกลับเข้าแชทอัตโนมัติต่อเนื่องจนจบงาน *(ใช้เฉพาะงานที่ไว้ใจ)*
4. **คุยในเว็บแชท AI:** เปิดเว็บที่รองรับ (เช่น ChatGPT, Gemini, DeepSeek, Qwen) แล้วพิมพ์สั่งงานได้เลย เช่น:  
   `ช่วยดูรายการไฟล์ใน Desktop ของฉันให้หน่อย`

---

## 🛠️ การตรวจสอบ/พัฒนาต่อ

```bash
npm run check   # ตรวจสอบ syntax ของไฟล์ JS และ manifest.json
npm test        # รันชุดทดสอบทั้งหมด
```

## 📄 License & Credit

- Original Project: [AstraxOf/web-mcp-bridge](https://github.com/AstraxOf/web-mcp-bridge) (MIT License)
- License: [MIT](LICENSE)

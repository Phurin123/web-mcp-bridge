/**
 * extra_chats.js — Adaptador para Kimi, Z.ai, Qwen, Copilot, Meta AI, Grok, Perplexity, Mistral y AI Studio.
 */
(() => {
  'use strict';
  const WMB = globalThis.WMB;

  const GENERIC_COMPOSER = ['textarea#chat-input', 'textarea.message-input-textarea', 'div[role="textbox"][contenteditable="true"]', 'div[contenteditable="true"]', 'textarea'];
  const GENERIC_SEND = ['button[type="submit"]', 'button[aria-label*="Send" i]', 'button[aria-label*="Submit" i]', 'button[class*="send" i]', 'div[class*="send" i]'];
  const GENERIC_MSGS = ['.markdown-body', '.markdown-prose', '.markdown', '.prose', '[class*="markdown" i]'];
  const GENERIC_STOP = ['button[aria-label*="Stop" i]', 'button[class*="stop" i]', 'div[class*="stop" i]'];

  const PLATFORMS = [
    {
      id: 'kimi',
      name: 'Kimi',
      hosts: ['kimi.com', 'kimi.moonshot.cn'],
      selectors: {
        composer: ['div[role="textbox"][contenteditable="true"]', 'div[contenteditable="true"]', 'textarea'],
        sendButton: ['button[aria-label*="Send" i]', 'button[type="submit"]', 'div[class*="send" i]', 'button[class*="send" i]'],
        assistantMessages: ['[class*="segment-content" i]', ...GENERIC_MSGS],
        stopButton: GENERIC_STOP,
      },
    },
    {
      id: 'zai',
      name: 'Z.ai',
      hosts: ['chat.z.ai', 'z.ai'],
      selectors: {
        composer: GENERIC_COMPOSER,
        sendButton: ['button#send-message-button', ...GENERIC_SEND],
        assistantMessages: GENERIC_MSGS,
        stopButton: GENERIC_STOP,
      },
    },
    {
      id: 'qwen',
      name: 'Qwen',
      hosts: ['chat.qwen.ai', 'qwen.ai'],
      selectors: {
        composer: ['textarea.message-input-textarea', ...GENERIC_COMPOSER],
        sendButton: ['button.send-button', 'button#send-message-button', ...GENERIC_SEND],
        assistantMessages: ['.markdown-body', '.qwen-markdown', ...GENERIC_MSGS],
        stopButton: GENERIC_STOP,
      },
    },
    {
      id: 'copilot',
      name: 'Copilot',
      hosts: ['copilot.microsoft.com', 'github.com'],
      selectors: {
        composer: ['textarea#userInput', 'textarea[placeholder*="Message" i]', ...GENERIC_COMPOSER],
        sendButton: ['button[data-testid="submit-button"]', 'button[aria-label*="Submit" i]', ...GENERIC_SEND],
        assistantMessages: ['[data-content="ai-message"]', '[class*="ai-message" i]', ...GENERIC_MSGS],
        stopButton: ['button[data-testid="stop-button"]', ...GENERIC_STOP],
      },
    },
    {
      id: 'meta',
      name: 'Meta AI',
      hosts: ['meta.ai'],
      selectors: {
        composer: ['div[role="textbox"][contenteditable="true"]', 'textarea[placeholder*="Ask Meta AI" i]', ...GENERIC_COMPOSER],
        sendButton: ['div[role="button"][aria-label*="Send" i]', ...GENERIC_SEND],
        assistantMessages: ['[data-testid*="assistant" i]', ...GENERIC_MSGS],
        stopButton: ['div[role="button"][aria-label*="Stop" i]', ...GENERIC_STOP],
      },
    },
    {
      id: 'grok',
      name: 'Grok',
      hosts: ['grok.com'],
      selectors: {
        composer: ['textarea', 'div[contenteditable="true"]'],
        sendButton: ['button[type="submit"]', 'button[aria-label*="Submit" i]', ...GENERIC_SEND],
        assistantMessages: ['.message-bubble', ...GENERIC_MSGS],
        stopButton: GENERIC_STOP,
      },
    },
    {
      id: 'perplexity',
      name: 'Perplexity',
      hosts: ['perplexity.ai'],
      selectors: {
        composer: ['textarea[placeholder*="Ask" i]', '#ask-input', ...GENERIC_COMPOSER],
        sendButton: ['button[aria-label="Submit"]', ...GENERIC_SEND],
        assistantMessages: ['.prose', ...GENERIC_MSGS],
        stopButton: GENERIC_STOP,
      },
    },
    {
      id: 'mistral',
      name: 'Mistral',
      hosts: ['chat.mistral.ai'],
      selectors: {
        composer: GENERIC_COMPOSER,
        sendButton: GENERIC_SEND,
        assistantMessages: GENERIC_MSGS,
        stopButton: GENERIC_STOP,
      },
    },
    {
      id: 'aistudio',
      name: 'Google AI Studio',
      hosts: ['aistudio.google.com'],
      selectors: {
        composer: ['textarea[aria-label*="Type something" i]', 'textarea', ...GENERIC_COMPOSER],
        sendButton: ['button[aria-label="Run"]', 'button.run-button', ...GENERIC_SEND],
        assistantMessages: ['.model-prompt-container', '.turn-content', ...GENERIC_MSGS],
        stopButton: GENERIC_STOP,
      },
    },
    {
      id: 'openrouter',
      name: 'OpenRouter',
      hosts: ['openrouter.ai'],
      selectors: { composer: GENERIC_COMPOSER, sendButton: GENERIC_SEND, assistantMessages: GENERIC_MSGS, stopButton: GENERIC_STOP },
    },
    {
      id: 'poe',
      name: 'Poe',
      hosts: ['poe.com'],
      selectors: {
        composer: ['textarea[class*="GrowingTextArea" i]', ...GENERIC_COMPOSER],
        sendButton: ['button[class*="SendButton" i]', ...GENERIC_SEND],
        assistantMessages: ['[class*="Message_botMessageBubble" i]', ...GENERIC_MSGS],
        stopButton: GENERIC_STOP,
      },
    },
    {
      id: 'huggingchat',
      name: 'HuggingChat',
      hosts: ['huggingface.co'],
      selectors: { composer: GENERIC_COMPOSER, sendButton: GENERIC_SEND, assistantMessages: GENERIC_MSGS, stopButton: GENERIC_STOP },
    },
    {
      id: 't3chat',
      name: 'T3 Chat',
      hosts: ['t3.chat'],
      selectors: { composer: GENERIC_COMPOSER, sendButton: GENERIC_SEND, assistantMessages: GENERIC_MSGS, stopButton: GENERIC_STOP },
    },
    {
      id: 'notebooklm',
      name: 'NotebookLM',
      hosts: ['notebooklm.google.com'],
      selectors: { composer: GENERIC_COMPOSER, sendButton: GENERIC_SEND, assistantMessages: GENERIC_MSGS, stopButton: GENERIC_STOP },
    },
  ];

  class ExtraChatAdapter extends WMB.BaseAdapter {
    constructor(cfg) {
      super({ id: cfg.id, name: cfg.name, selectors: cfg.selectors });
      this.hosts = cfg.hosts;
    }

    matches(hostname) {
      return this.hosts.some((h) => hostname === h || hostname.endsWith(`.${h}`));
    }
  }

  for (const cfg of PLATFORMS) {
    WMB.registerAdapter(new ExtraChatAdapter(cfg));
  }
})();

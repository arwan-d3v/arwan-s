"use client";

import { useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";

type Message = { role: "ai" | "user"; text: string };

const SUGGESTIONS = [
  "I need a landing page",
  "Build a wedding invitation",
  "Help me with trading signals",
];

export function AiCompanion() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi, I'm Zenitsu — Arwan's AI companion. How can I help spark your next project?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");

    // Optimistic scrolling
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((m) => [...m, { role: "ai", text: data.reply }]);
      } else {
        setMessages((m) => [...m, { role: "ai", text: "Sorry, I couldn't process that request right now." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((m) => [...m, { role: "ai", text: "Sorry, my circuits are overloaded!" }]);
    } finally {
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }

  return (
    <div className="glass flex h-[28rem] flex-col rounded-3xl p-5">
      <div className="flex items-center gap-3 border-b border-[var(--card-border)] pb-4">
        <span className="clay flex h-10 w-10 items-center justify-center rounded-2xl">
          <Bot className="h-5 w-5 text-primary" />
        </span>
        <div>
          <p className="font-display text-sm font-semibold">AI Companion</p>
          <p className="text-xs text-muted-foreground">
            Powered by Thunder Breathing
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto py-4 pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                m.role === "ai" ? "bg-primary/15" : "bg-accent/15"
              }`}
            >
              {m.role === "ai" ? (
                <Bot className="h-4 w-4 text-primary" />
              ) : (
                <User className="h-4 w-4 text-accent" />
              )}
            </span>
            <p
              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                m.role === "ai"
                  ? "bg-muted text-foreground"
                  : "bg-primary/15 text-foreground"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Quote mini-form */}
      {showForm ? (
        sent ? (
          <p className="rounded-2xl bg-primary/10 px-4 py-3 text-sm text-primary">
            Thanks! Your request was sent to Arwan. We&apos;ll reach out shortly.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-2"
          >
            <input
              required
              type="email"
              placeholder="Your email"
              className="w-full rounded-xl border border-[var(--card-border)] bg-muted px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground glow-gold"
            >
              Send request to Arwan
            </button>
          </form>
        )
      ) : (
        <>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => setShowForm(true)}
              className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent"
            >
              Request a quote
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 rounded-xl border border-[var(--card-border)] bg-muted px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="clay flex h-10 w-10 items-center justify-center rounded-xl text-primary"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { findAnswer, wantsCall, isGreeting, CALL_NUDGE } from "@/lib/knowledge";

type Msg = { from: "mini" | "you"; text: string };

type Lead = { name: string; email: string; phone: string; note: string };

const QUICK_REPLIES = [
  "What services do you offer?",
  "How long does a project take?",
  "Do you work outside California?",
  "Book a call",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "mini",
      text: "Hi, I'm Mini — Noma's studio assistant. Ask me about our services, process, or projects, and I can set up a call with the team whenever you're ready.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<"chat" | "lead" | "done">("chat");
  const [lead, setLead] = useState<Lead>({ name: "", email: "", phone: "", note: "" });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // keep the latest message in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, mode]);

  // focus input when the panel opens
  useEffect(() => {
    if (open && mode === "chat") setTimeout(() => inputRef.current?.focus(), 350);
  }, [open, mode]);

  const pushMini = (text: string, delay = 650) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "mini", text }]);
    }, delay);
  };

  const respond = (userText: string) => {
    // 1. Direct intent to talk to the team → open the lead form.
    if (wantsCall(userText)) {
      pushMini(
        "Love that — let me grab a few details and the studio will reach out within two business days.",
        550
      );
      setLead((l) => ({ ...l, note: userText }));
      setTimeout(() => setMode("lead"), 1250);
      return;
    }

    // 2. Greeting.
    if (isGreeting(userText) && userText.length < 16) {
      pushMini("Hello! What can I help you with — our work, process, or starting a project?");
      return;
    }

    // 3. Knowledge lookup.
    const answer = findAnswer(userText);
    if (answer) {
      pushMini(answer);
      // nudge toward a call a beat later
      setTimeout(() => pushMini(CALL_NUDGE, 500), 1300);
      return;
    }

    // 4. Fallback → always route toward a conversation.
    pushMini(
      "That's a great one for the team directly — they'll give you a proper answer. Want me to set up a quick call? Just say \"book a call\".",
      700
    );
  };

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "you", text }]);
    setInput("");
    respond(text);
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.email.trim()) return;
    // Demo: no backend — surface the captured lead for wiring later.
    console.log("[Mini] call request:", lead);
    setMode("done");
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        aria-label={open ? "Close chat with Mini" : "Chat with Mini"}
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full bg-ink text-bone pl-2 pr-5 py-2 shadow-lg shadow-ink/20 transition-transform duration-300 hover:scale-[1.03] active:scale-95"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-bone text-ink font-serif text-lg leading-none">
          M
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-ink" />
        </span>
        <span className="eyebrow">{open ? "Close" : "Ask Mini"}</span>
      </button>

      {/* Panel */}
      <div
        className="fixed bottom-20 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-[380px] origin-bottom-right"
        style={{
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s ease",
        }}
        aria-hidden={!open}
      >
        <div className="flex h-[min(70vh,560px)] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-bone shadow-2xl shadow-ink/25">
          {/* Header */}
          <div className="flex items-center gap-3 border-b hairline px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-bone font-serif text-lg leading-none">
              M
            </span>
            <div className="leading-tight">
              <p className="font-serif text-base">Mini</p>
              <p className="eyebrow opacity-50">Noma® studio assistant</p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 eyebrow opacity-60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
            </span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <Bubble key={i} from={m.from}>
                {m.text}
              </Bubble>
            ))}

            {typing && (
              <Bubble from="mini">
                <span className="inline-flex gap-1 py-0.5">
                  <Dot /> <Dot d={0.15} /> <Dot d={0.3} />
                </span>
              </Bubble>
            )}

            {/* Lead capture form */}
            {mode === "lead" && (
              <form onSubmit={submitLead} className="rounded-xl border hairline bg-paper p-3.5 space-y-2.5">
                <p className="eyebrow opacity-60">Request a call</p>
                <LeadInput
                  placeholder="Your name"
                  value={lead.name}
                  onChange={(v) => setLead((l) => ({ ...l, name: v }))}
                  required
                />
                <LeadInput
                  placeholder="Email"
                  type="email"
                  value={lead.email}
                  onChange={(v) => setLead((l) => ({ ...l, email: v }))}
                  required
                />
                <LeadInput
                  placeholder="Phone (optional)"
                  value={lead.phone}
                  onChange={(v) => setLead((l) => ({ ...l, phone: v }))}
                />
                <textarea
                  rows={2}
                  value={lead.note}
                  onChange={(e) => setLead((l) => ({ ...l, note: e.target.value }))}
                  placeholder="What's the project? (optional)"
                  className="w-full resize-none rounded-lg border hairline bg-bone px-3 py-2 text-sm outline-none placeholder:opacity-40 focus:border-ink/40"
                />
                <button
                  type="submit"
                  className="btn-arrow w-full justify-center rounded-full bg-ink px-4 py-2.5 text-sm text-bone transition-opacity hover:opacity-90"
                >
                  <span className="dot bg-bone" /> Request call →
                </button>
              </form>
            )}

            {mode === "done" && (
              <div className="rounded-xl border hairline bg-paper p-4 text-center">
                <p className="font-serif text-card">Thank you, {lead.name.split(" ")[0] || "there"}.</p>
                <p className="mt-2 text-sm opacity-70">
                  The studio will reach out within two business days. Talk soon.
                </p>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {mode === "chat" && messages.length < 4 && !typing && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border hairline px-3 py-1.5 text-xs transition-colors hover:bg-ink hover:text-bone"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          {mode !== "done" && (
            <div className="border-t hairline p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2 rounded-full border hairline bg-paper pl-4 pr-1.5 py-1.5"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Mini anything…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={!input.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-bone transition-opacity disabled:opacity-30"
                >
                  ↑
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Bubble({ from, children }: { from: "mini" | "you"; children: React.ReactNode }) {
  const mine = from === "you";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          mine
            ? "rounded-br-sm bg-ink text-bone"
            : "rounded-bl-sm border hairline bg-paper text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full bg-ink/50"
      style={{ animation: "miniBounce 1s ease-in-out infinite", animationDelay: `${d}s` }}
    />
  );
}

function LeadInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border hairline bg-bone px-3 py-2 text-sm outline-none placeholder:opacity-40 focus:border-ink/40"
    />
  );
}

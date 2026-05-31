"use client";

/**
 * CodeEditor — editor de código animado (se mantiene del diseño anterior por
 * petición). Teclea una API route de IA (OpenAI/Next.js) con syntax highlight,
 * números de línea y terminal simulada. Auto-contenido y oscuro, encaja en el
 * sistema Aurora. Respeta prefers-reduced-motion (muestra el código completo).
 */

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const codeLines = [
  "import { OpenAI } from 'openai';",
  "import { NextRequest, NextResponse } from 'next/server';",
  "",
  "const openai = new OpenAI({",
  "  apiKey: process.env.OPENAI_API_KEY,",
  "});",
  "",
  "export async function POST(request: NextRequest) {",
  "  const { message, context } = await request.json();",
  "",
  "  const completion = await openai.chat.completions.create({",
  "    model: 'gpt-4-turbo',",
  "    messages: [",
  "      { role: 'system', content: context },",
  "      { role: 'user', content: message }",
  "    ],",
  "    temperature: 0.7,",
  "    max_tokens: 1000,",
  "  });",
  "",
  "  return NextResponse.json({",
  "    response: completion.choices[0].message.content,",
  "    usage: completion.usage",
  "  });",
  "}",
];

function highlightSyntax(line: string): string {
  if (!line) return "";
  const keywords = ["import", "export", "const", "async", "function", "await", "new", "return"];
  let highlighted = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Strings
  highlighted = highlighted.replace(/'[^']*'|"[^"]*"/g, (m) => `<span class="text-emerald-400">${m}</span>`);
  // Keywords
  keywords.forEach((kw) => {
    highlighted = highlighted.replace(new RegExp(`\\b${kw}\\b`, "g"), `<span class="text-violet-400 font-semibold">${kw}</span>`);
  });
  // object.method
  highlighted = highlighted.replace(/(\w+)\.(\w+)/g, '<span class="text-cyan-300">$1</span>.<span class="text-amber-300">$2</span>');
  return highlighted;
}

export function CodeEditor() {
  const reduce = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>([]);

  useEffect(() => {
    if (reduce) {
      setDisplayed(codeLines);
      setLineIndex(codeLines.length);
      return;
    }
    const interval = setInterval(() => {
      if (lineIndex < codeLines.length) {
        const current = codeLines[lineIndex];
        if (charIndex < current.length) {
          setDisplayed((prev) => {
            const next = [...prev];
            next[lineIndex] = (next[lineIndex] || "") + current[charIndex];
            return next;
          });
          setCharIndex((c) => c + 1);
        } else {
          setLineIndex((l) => l + 1);
          setCharIndex(0);
        }
      } else {
        setTimeout(() => {
          setLineIndex(0);
          setCharIndex(0);
          setDisplayed([]);
        }, 3000);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [lineIndex, charIndex, reduce]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0F] shadow-[0_24px_60px_-20px_rgba(79,70,229,0.45)]">
      {/* glow aurora detrás */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 100% 0%, rgba(6,182,212,0.12), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(124,58,237,0.12), transparent 70%)" }}
      />
      {/* header */}
      <div className="relative flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono text-xs text-zinc-500">api/ai/chat/route.ts</span>
      </div>
      {/* code */}
      <div className="relative min-h-[360px] p-4 font-mono text-[13px] leading-[1.5]">
        {displayed.map((line, i) => (
          <div key={i} className="flex min-h-[20px] items-center">
            <span className="mr-4 w-6 select-none text-right text-[11px] text-zinc-600">{line ? i + 1 : ""}</span>
            <span className="text-zinc-100" dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
            {i === lineIndex && <span className="ml-0.5 inline-block h-4 w-[7px] animate-pulse bg-aurora-cyan" />}
          </div>
        ))}
      </div>
      {/* terminal */}
      <div className="relative border-t border-white/10 bg-black/40 px-4 py-2.5 font-mono text-[11px]">
        <div className="text-emerald-400"><span className="text-zinc-600">$</span> npm run dev</div>
        <div className="mt-1 flex items-center text-emerald-400">
          <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Ready on http://localhost:3000
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;

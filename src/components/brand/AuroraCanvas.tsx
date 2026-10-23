"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
  Aurora curtains: each ribbon is a run of thin vertical strokes whose top edge follows
  two layered sine waves. Strokes are drawn from a pre-rendered gradient sprite with
  additive blending, so a frame costs a few hundred drawImage calls.
  The three ribbons stand for the three units (violet · Digital, blue · Integra, mint · Facilities).
*/

type Ribbon = { colors: [string, string, string]; base: number; amp: number; freq: number; speed: number; phase: number; len: number };

const RIBBONS: Ribbon[] = [
  { colors: ["rgba(124,58,237,0)", "rgba(150,100,250,0.55)", "rgba(124,58,237,0)"], base: 0.2, amp: 0.08, freq: 1.7, speed: 0.16, phase: 0, len: 0.42 },
  { colors: ["rgba(79,70,229,0)", "rgba(90,140,255,0.5)", "rgba(37,99,235,0)"], base: 0.32, amp: 0.1, freq: 1.25, speed: 0.12, phase: 2.1, len: 0.36 },
  { colors: ["rgba(52,211,153,0)", "rgba(110,240,200,0.5)", "rgba(6,182,212,0)"], base: 0.44, amp: 0.07, freq: 2.1, speed: 0.2, phase: 4.2, len: 0.3 },
];

function makeSprite(colors: [string, string, string]) {
  const c = document.createElement("canvas");
  c.width = 2;
  c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(0.18, colors[1]);
  grad.addColorStop(1, colors[2]);
  g.fillStyle = grad;
  g.fillRect(0, 0, 2, 256);
  return c;
}

export function AuroraCanvas({ paused, className }: { paused: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprites = RIBBONS.map((r) => makeSprite(r.colors));
    let w = 0, h = 0, raf = 0, visible = true, t = 0, last = performance.now();
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let stars: { x: number; y: number; r: number; a: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, (_, i) => {
        const s = Math.sin(i * 12.9898) * 43758.5453;
        const r2 = Math.sin(i * 78.233) * 12345.678;
        return { x: (s - Math.floor(s)) * w, y: (r2 - Math.floor(r2)) * h * 0.85, r: i % 7 === 0 ? 1.2 : 0.6, a: 0.25 + ((i * 37) % 60) / 100 };
      });
    };

    const draw = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        ctx.globalAlpha = s.a * (0.75 + 0.25 * Math.sin(t * 0.8 + s.x));
        ctx.fillStyle = "#e9e7ff";
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";

      const step = w < 640 ? 4 : 5;
      const px = (pointer.x - 0.5) * 0.6;
      RIBBONS.forEach((r, i) => {
        const sprite = sprites[i];
        for (let x = -step; x < w + step; x += step) {
          const u = x / w;
          const wave =
            Math.sin(u * Math.PI * r.freq + t * r.speed * 6 + r.phase + px) * r.amp +
            Math.sin(u * Math.PI * r.freq * 2.3 - t * r.speed * 4 + r.phase * 1.7) * r.amp * 0.45;
          const y = h * (r.base + wave + (pointer.y - 0.5) * 0.04);
          const flicker = 0.75 + 0.25 * Math.sin(u * 40 + t * 1.3 + i);
          const len = h * r.len * (0.7 + 0.3 * Math.sin(u * 9 + t * 0.7 + r.phase)) * flicker;
          ctx.globalAlpha = 0.55 + 0.45 * Math.sin(u * Math.PI);
          ctx.drawImage(sprite, x, y, step + 1.5, len);
        }
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const moving = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.002;
      if (visible && !pausedRef.current) { t += dt; draw(); }
      else if (visible && moving) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    };

    resize();
    t = 3.2;
    draw();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={cn("absolute inset-0 h-full w-full", className)} />;
}

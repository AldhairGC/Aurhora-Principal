"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  isMobileDevice,
  getOptimalParticleCount,
  shouldDrawConnections,
  getAnimationFrameRate,
} from "@/lib/utils/device";

interface AnimatedBackgroundProps {
  opacity?: number;
}

export default function AnimatedBackground({ opacity = 0.4 }: AnimatedBackgroundProps) {
  const { theme, currentTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particlesArray: any[] = [];
    const isMobile = isMobileDevice();
    const drawConnections = shouldDrawConnections();
    const targetFPS = getAnimationFrameRate();
    const frameDelay = 1000 / targetFPS;
    let lastFrameTime = 0;

    const setupParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray.length = 0;
      const particleCount = getOptimalParticleCount(60, window.innerWidth);

      for (let i = 0; i < particleCount; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.2),
          vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.2),
          vz: (Math.random() - 0.5) * (isMobile ? 0.6 : 0.8),
          size: Math.random() * (isMobile ? 1 : 1.2) + 0.3,
          opacity: Math.random() * 0.3 + 0.05,
        });
      }
    };

    setupParticles();

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime < frameDelay) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      ctx.fillStyle =
        theme === "dark"
          ? "rgba(17, 24, 39, 0.03)"
          : "rgba(249, 250, 251, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        if (particle.z < 1 || particle.z > 1000) particle.vz *= -1;

        const scale = 1000 / (1000 + particle.z);
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d =
          (particle.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = Math.max(0, particle.size * scale);

        if (size > 0.1) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);

          if (isMobile) {
            ctx.fillStyle =
              theme === "dark"
                ? `rgba(6, 182, 212, ${Math.min(1, particle.opacity * scale * 0.6)})`
                : `rgba(168, 85, 247, ${Math.min(1, particle.opacity * scale * 0.6)})`;
          } else {
            const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
            gradient.addColorStop(
              0,
              theme === "dark"
                ? `rgba(6, 182, 212, ${Math.min(1, particle.opacity * scale * 0.8)})`
                : `rgba(168, 85, 247, ${Math.min(1, particle.opacity * scale * 0.8)})`
            );
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
          }
          ctx.fill();
        }

        if (drawConnections) {
          for (let j = i + 1; j < particlesArray.length; j++) {
            const particle2 = particlesArray[j];
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const dz = particle.z - particle2.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const connectionDistance = 120;

            if (distance < connectionDistance) {
              const opacity = Math.max(
                0,
                (1 - distance / connectionDistance) * 0.2 * scale
              );
              if (opacity > 0.01) {
                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                const scale2 = 1000 / (1000 + particle2.z);
                const x2d2 =
                  (particle2.x - canvas.width / 2) * scale2 + canvas.width / 2;
                const y2d2 =
                  (particle2.y - canvas.height / 2) * scale2 + canvas.height / 2;
                ctx.lineTo(x2d2, y2d2);
                ctx.strokeStyle =
                  theme === "dark"
                    ? `rgba(6, 182, 212, ${opacity})`
                    : `rgba(168, 85, 247, ${opacity})`;
                ctx.lineWidth = 0.3;
                ctx.stroke();
              }
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      setupParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isClient]);

  if (!isClient) return null;

  const gradientColors = currentTheme.gradient || "from-cyan-500 to-purple-500";

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br ${gradientColors} blur-3xl opacity-20 animate-pulse`}
          style={{
            left: `${mousePosition.x * 0.03 - 50}px`,
            top: `${mousePosition.y * 0.03 - 50}px`,
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0003})`,
          }}
        />
        <div
          className={`absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr ${gradientColors} blur-3xl opacity-15 animate-pulse`}
          style={{
            right: `${(typeof window !== "undefined" ? window.innerWidth : 0) - mousePosition.x * 0.03 - 100}px`,
            bottom: `${(typeof window !== "undefined" ? window.innerHeight : 0) - mousePosition.y * 0.03 - 100}px`,
            animationDelay: "0.5s",
            transform: `scale(${1 + scrollY * 0.0002})`,
          }}
        />
      </div>
    </>
  );
}

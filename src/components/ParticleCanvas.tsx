"use client";

import React, { useEffect, useRef, memo, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  isMobileDevice,
  getOptimalParticleCount,
  shouldDrawConnections,
  getAnimationFrameRate,
  isLowPerformanceDevice,
} from "@/lib/utils/device";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

interface ParticleCanvasProps {
  className?: string;
  opacity?: number;
}

/**
 * Optimized particle canvas component
 * - Uses requestAnimationFrame with frame limiting
 * - Reduces particles on mobile/low-perf devices
 * - Disables connections on mobile
 * - Uses simple fills instead of gradients on mobile
 */
const ParticleCanvas = memo(function ParticleCanvas({ 
  className = "fixed inset-0 pointer-events-none z-0",
  opacity = 0.4
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const { theme } = useTheme();

  const setupParticles = useCallback((width: number, height: number) => {
    const isMobile = isMobileDevice();
    const particleCount = getOptimalParticleCount(60, width);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.2),
        vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.2),
        vz: (Math.random() - 0.5) * (isMobile ? 0.6 : 0.8),
        size: Math.random() * (isMobile ? 1 : 1.2) + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return; // Don't animate if user prefers reduced motion
    }

    const isMobile = isMobileDevice();
    const isLowPerf = isLowPerformanceDevice();
    const drawConnections = shouldDrawConnections();
    const targetFPS = getAnimationFrameRate();
    const frameDelay = 1000 / targetFPS;
    let lastFrameTime = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = setupParticles(canvas.width, canvas.height);
    };

    resizeCanvas();

    const animate = (currentTime: number) => {
      // Frame rate limiting
      if (currentTime - lastFrameTime < frameDelay) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      // Clear with slight fade for trail effect
      ctx.fillStyle = theme === "dark" 
        ? "rgba(17, 24, 39, 0.03)" 
        : "rgba(249, 250, 251, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const particleColor = theme === "dark" ? "6, 182, 212" : "168, 85, 247";

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        if (particle.z < 1 || particle.z > 1000) particle.vz *= -1;

        // Calculate 3D projection
        const scale = 1000 / (1000 + particle.z);
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = Math.max(0, particle.size * scale);

        if (size > 0.1) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);

          // Use simple fill on mobile/low-perf, gradient on desktop
          if (isMobile || isLowPerf) {
            ctx.fillStyle = `rgba(${particleColor}, ${Math.min(1, particle.opacity * scale * 0.6)})`;
          } else {
            const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
            gradient.addColorStop(0, `rgba(${particleColor}, ${Math.min(1, particle.opacity * scale * 0.8)})`);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
          }
          ctx.fill();
        }

        // Only draw connections on desktop for performance
        if (drawConnections && i < particles.length - 1) {
          for (let j = i + 1; j < Math.min(i + 10, particles.length); j++) {
            const particle2 = particles[j];
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const dz = particle.z - particle2.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 120) {
              const lineOpacity = Math.max(0, (1 - distance / 120) * 0.2 * scale);
              if (lineOpacity > 0.01) {
                const scale2 = 1000 / (1000 + particle2.z);
                const x2d2 = (particle2.x - canvas.width / 2) * scale2 + canvas.width / 2;
                const y2d2 = (particle2.y - canvas.height / 2) * scale2 + canvas.height / 2;

                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                ctx.lineTo(x2d2, y2d2);
                ctx.strokeStyle = `rgba(${particleColor}, ${lineOpacity})`;
                ctx.lineWidth = 0.3;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, setupParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
});

export default ParticleCanvas;

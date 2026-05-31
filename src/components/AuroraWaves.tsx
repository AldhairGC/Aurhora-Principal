"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface AuroraWavesProps {
  opacity?: number;
}

export default function AuroraWaves({ opacity = 0.8 }: AuroraWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detectar si es móvil para optimizar rendimiento
    const isMobile = window.innerWidth < 768;

    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Parámetros de las ondas - Auroras boreales realistas
    let time = 0;
    const waves = [
      {
        amplitude: 180,
        frequency: 0.0008,
        speed: 0.008,
        offset: 0,
        yPosition: 0.2,
        colors: ["rgba(34, 197, 94, 0.25)", "rgba(16, 185, 129, 0.15)", "rgba(5, 150, 105, 0.05)"]
      },
      {
        amplitude: 220,
        frequency: 0.0006,
        speed: 0.012,
        offset: Math.PI / 2.5,
        yPosition: 0.25,
        colors: ["rgba(6, 182, 212, 0.3)", "rgba(14, 165, 233, 0.2)", "rgba(3, 105, 161, 0.08)"]
      },
      {
        amplitude: 200,
        frequency: 0.0007,
        speed: 0.01,
        offset: Math.PI / 1.8,
        yPosition: 0.3,
        colors: ["rgba(168, 85, 247, 0.28)", "rgba(147, 51, 234, 0.18)", "rgba(126, 34, 206, 0.08)"]
      },
      {
        amplitude: 160,
        frequency: 0.0009,
        speed: 0.015,
        offset: Math.PI / 1.2,
        yPosition: 0.35,
        colors: ["rgba(236, 72, 153, 0.22)", "rgba(219, 39, 119, 0.15)", "rgba(190, 24, 93, 0.06)"]
      },
      {
        amplitude: 240,
        frequency: 0.0005,
        speed: 0.007,
        offset: Math.PI * 1.4,
        yPosition: 0.15,
        colors: ["rgba(59, 130, 246, 0.25)", "rgba(37, 99, 235, 0.16)", "rgba(29, 78, 216, 0.07)"]
      },
      {
        amplitude: 190,
        frequency: 0.00065,
        speed: 0.011,
        offset: Math.PI * 0.7,
        yPosition: 0.28,
        colors: ["rgba(134, 239, 172, 0.2)", "rgba(74, 222, 128, 0.12)", "rgba(34, 197, 94, 0.05)"]
      }
    ];

    // Función para dibujar una onda más orgánica y realista
    const drawWave = (wave: typeof waves[0], phaseShift: number) => {
      ctx.beginPath();
      
      const startY = canvas.height * wave.yPosition;
      const points: {x: number, y: number}[] = [];
      
      // Generar puntos de la onda con múltiples frecuencias para más naturalidad
      for (let x = 0; x <= canvas.width; x += 1) {
        const primaryWave = Math.sin(x * wave.frequency + time * wave.speed + wave.offset + phaseShift) * wave.amplitude;
        const secondaryWave = Math.sin(x * wave.frequency * 2.3 + time * wave.speed * 0.7) * (wave.amplitude * 0.3);
        const tertiaryWave = Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.8) * (wave.amplitude * 0.15);
        const noiseWave = Math.sin(x * 0.05 + time * 0.03) * (wave.amplitude * 0.08);
        
        const y = startY + primaryWave + secondaryWave + tertiaryWave + noiseWave;
        points.push({x, y});
      }
      
      // Dibujar curva suave usando los puntos
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      
      // Completar el path
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      // Gradiente vertical más complejo
      const gradient = ctx.createLinearGradient(0, startY - wave.amplitude * 1.5, 0, canvas.height);
      gradient.addColorStop(0, wave.colors[0]);
      gradient.addColorStop(0.3, wave.colors[1]);
      gradient.addColorStop(0.7, wave.colors[2]);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = 'screen';
      ctx.fill();
      
      // Borde brillante superior
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      
      ctx.strokeStyle = wave.colors[0].replace(/[\d.]+\)$/, "0.5)");
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = wave.colors[0];
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';
    };

    // Función para dibujar rayos verticales más realistas
    const drawAuroraRays = () => {
      const rayCount = isMobile ? 6 : 12;
      const raySpacing = canvas.width / (rayCount - 1);
      
      ctx.globalCompositeOperation = 'screen';
      
      for (let i = 0; i < rayCount; i++) {
        const baseX = raySpacing * i;
        const offsetX = Math.sin(time * 0.008 + i * 0.5) * 80;
        const x = baseX + offsetX;
        
        const rayHeight = canvas.height * (0.5 + Math.sin(time * 0.01 + i) * 0.15);
        const rayWidth = 25 + Math.sin(time * 0.012 + i * 0.8) * 15;
        const alpha = Math.max(0.05, (Math.sin(time * 0.015 + i * 0.7) * 0.15 + 0.12) * (isMobile ? 0.7 : 1));
        
        // Crear gradiente vertical con desvanecimiento
        const gradient = ctx.createLinearGradient(x, 0, x, rayHeight);
        
        // Colores más sutiles y variados
        const colorSets = [
          [`rgba(34, 197, 94, ${alpha})`, `rgba(16, 185, 129, ${alpha * 0.5})`, `rgba(6, 182, 212, ${alpha * 0.2})`],
          [`rgba(59, 130, 246, ${alpha})`, `rgba(99, 102, 241, ${alpha * 0.5})`, `rgba(168, 85, 247, ${alpha * 0.2})`],
          [`rgba(168, 85, 247, ${alpha})`, `rgba(147, 51, 234, ${alpha * 0.5})`, `rgba(236, 72, 153, ${alpha * 0.2})`],
          [`rgba(6, 182, 212, ${alpha})`, `rgba(14, 165, 233, ${alpha * 0.5})`, `rgba(59, 130, 246, ${alpha * 0.2})`]
        ];
        
        const colorSet = colorSets[i % colorSets.length];
        gradient.addColorStop(0, colorSet[0]);
        gradient.addColorStop(0.4, colorSet[1]);
        gradient.addColorStop(0.8, colorSet[2]);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        // Dibujar rayo con bordes suaves
        ctx.save();
        ctx.filter = 'blur(15px)';
        ctx.fillStyle = gradient;
        ctx.fillRect(x - rayWidth / 2, 0, rayWidth, rayHeight);
        ctx.restore();
        
        // Añadir brillo central
        const coreGradient = ctx.createLinearGradient(x, 0, x, rayHeight * 0.6);
        coreGradient.addColorStop(0, colorSet[0].replace(/[\d.]+\)$/, `${alpha * 1.5})`));
        coreGradient.addColorStop(0.5, colorSet[1]);
        coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = coreGradient;
        ctx.fillRect(x - rayWidth / 4, 0, rayWidth / 2, rayHeight * 0.6);
      }
      
      ctx.globalCompositeOperation = 'source-over';
    };

    // Control de framerate para móviles
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameDelay = 1000 / targetFPS;

    // Función de animación
    const animate = (currentTime: number) => {
      // Limitar framerate en móviles
      if (currentTime - lastFrameTime < frameDelay) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      // Limpiar canvas con un fade suave
      ctx.fillStyle = theme === "dark" 
        ? "rgba(17, 24, 39, 0.08)" 
        : "rgba(249, 250, 251, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar rayos verticales de aurora primero (fondo)
      drawAuroraRays();
      
      // Dibujar cada onda con diferentes fases
      waves.forEach((wave, index) => {
        drawWave(wave, index * 0.5);
      });
      
      // Partículas sutiles que simulan el brillo de la aurora
      const particleCount = isMobile ? 30 : 60;
      ctx.globalCompositeOperation = 'screen';
      
      for (let i = 0; i < particleCount; i++) {
        const x = (time * 8 + i * 100 + Math.sin(time * 0.005 + i) * 50) % (canvas.width + 200) - 100;
        const baseY = canvas.height * 0.1 + (i % 6) * (canvas.height * 0.08);
        const y = baseY + Math.sin(time * 0.015 + i * 0.3) * 80;
        const size = (Math.sin(time * 0.03 + i) * 1 + 1.5) * (isMobile ? 0.8 : 1);
        const alpha = Math.max(0.05, Math.sin(time * 0.02 + i * 0.5) * 0.4 + 0.3);
        
        // Colores más sutiles y variados
        const colors = [
          `rgba(134, 239, 172, ${alpha})`,
          `rgba(103, 232, 249, ${alpha})`,
          `rgba(196, 181, 253, ${alpha})`,
          `rgba(251, 207, 232, ${alpha})`,
          `rgba(147, 197, 253, ${alpha})`,
          `rgba(167, 243, 208, ${alpha})`
        ];
        
        const particleColor = colors[i % colors.length];
        
        // Halo suave
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 8);
        gradient.addColorStop(0, particleColor.replace(/[\d.]+\)$/, `${alpha * 0.6})`));
        gradient.addColorStop(0.3, particleColor.replace(/[\d.]+\)$/, `${alpha * 0.3})`));
        gradient.addColorStop(0.7, particleColor.replace(/[\d.]+\)$/, `${alpha * 0.1})`));
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Núcleo brillante
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalCompositeOperation = 'source-over';
      
      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        opacity,
        mixBlendMode: theme === "dark" ? "screen" : "multiply"
      }}
    />
  );
}

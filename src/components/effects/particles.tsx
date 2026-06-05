"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const ctxCapture = ctx;
    const canvasCapture = canvas;

    function resize() {
      canvasCapture.width = window.innerWidth;
      canvasCapture.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.min(60, Math.floor((canvasCapture.width * canvasCapture.height) / 15000));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvasCapture.width,
        y: Math.random() * canvasCapture.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      }));
    }

    function draw() {
      ctxCapture.clearRect(0, 0, canvasCapture.width, canvasCapture.height);

      const mouse = mouseRef.current;

      particlesRef.current.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist && mouse.x > 0) {
          const force = (maxDist - dist) / maxDist;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvasCapture.width;
        if (p.x > canvasCapture.width) p.x = 0;
        if (p.y < 0) p.y = canvasCapture.height;
        if (p.y > canvasCapture.height) p.y = 0;

        ctxCapture.beginPath();
        ctxCapture.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctxCapture.fillStyle = `rgba(74, 111, 255, ${p.alpha})`;
        ctxCapture.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}

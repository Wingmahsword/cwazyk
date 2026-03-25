"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// ============================================
// ✨ KINETIC EFFECTS
// ============================================

export function NoiseOverlay() {
  return <div className="noise-overlay" />;
}

export function ScanlineOverlay() {
  return <div className="scanline-overlay" />;
}

interface ReactiveBackgroundProps {
  lineCount?: number;
  opacity?: number;
}

export function ReactiveBackground({ lineCount = 8, opacity = 0.15 }: ReactiveBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 1000,
          y: ((e.clientY - rect.top) / rect.height) * 1000
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <g filter="url(#glow)" stroke="var(--brutal-accent)" strokeWidth="0.5" fill="none">
        {Array.from({ length: lineCount }).map((_, i) => (
          <path
            key={i}
            d={`M${i * (1000 / lineCount) - 50},1100 Q${mousePos.x},${mousePos.y} ${i * (1000 / lineCount)},-100`}
            opacity={0.3 + (i % 3) * 0.2}
            className="transition-all duration-1000 ease-out"
          />
        ))}
      </g>
    </svg>
  );
}

// ============================================
// 📰 GRIDS & CARDS
// ============================================

interface EditorialGridProps {
  children: React.ReactNode;
}

export function EditorialGrid({ children }: EditorialGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-24">
      {children}
    </div>
  );
}

interface EditorialCardProps {
  title: string;
  vps: number | string;
  description: string;
  onClick: () => void;
  onDownload?: () => void;
}

export function EditorialCard({ title, vps, description, onClick, onDownload }: EditorialCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass group cursor-pointer relative overflow-hidden text-left"
    >
      <div className="aspect-[9/16] relative overflow-hidden bg-black/40" onClick={onClick}>
        <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
          <div className="flex justify-between items-center mb-4">
            <span className="meta-mono text-gold">VPS: {vps}%</span>
            {onDownload && (
              <button 
                onClick={(e) => { e.stopPropagation(); onDownload(); }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-black transition-all flex items-center justify-center backdrop-blur-md"
                title="Download Reel"
              >
                ↓
              </button>
            )}
          </div>
          <h3 className="subtitle-stretched text-xl md:text-2xl mb-2">{title}</h3>
          <p className="text-xs opacity-0 group-hover:opacity-60 transition-opacity duration-300 line-clamp-2">
            {description}
          </p>
          <div className="mt-6 flex items-center gap-4 text-[0.6rem] tracking-[0.3em] font-black uppercase border-t border-white/10 pt-4">
             PREVIEW REEL →
          </div>
        </div>
        
        {/* Kinetic scanline on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,white_50%)] bg-[length:100%_4px]" />
      </div>
    </motion.div>
  );
}

// ============================================
// 🎯 NAVIGATION
// ============================================

interface NavFixedProps {
  logo?: string;
}

export function NavFixed({ logo = "VIRAL LAB" }: NavFixedProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-8 flex justify-between items-center mix-blend-difference pointer-events-auto">
      <h1 className="font-editorial text-2xl font-black italic tracking-tighter text-white">
        {logo}
      </h1>
      <div className="flex gap-10 items-center">
        <span className="meta-mono text-[0.5rem]">V.2.5 PREMIUM</span>
        <div className="w-10 h-[1px] bg-white opacity-20" />
      </div>
    </nav>
  );
}

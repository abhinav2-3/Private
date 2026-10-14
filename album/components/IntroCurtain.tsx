"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";

interface IntroCurtainProps {
  onOpen: () => void;
}

export const IntroCurtain: React.FC<IntroCurtainProps> = ({ onOpen }) => {
  const [opening, setOpening] = useState(false);

  const handleOpenClick = () => {
    setOpening(true);

    // Celebratory confetti burst
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#cfa858", "#c8644e", "#f6edda", "#ffffff"],
      });
    } catch {
      // Confetti optional
    }

    // Call onOpen to start music and open book
    onOpen();
  };

  if (opening) {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 opacity-0 bg-stone-950" />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-md">
      {/* Vintage Envelope Keepsake Card */}
      <div className="w-full max-w-lg bg-cover border-2 border-cover-accent/40 rounded-cover p-8 sm:p-12 shadow-book text-center relative overflow-hidden flex flex-col items-center">
        {/* Ornate Gold Border */}
        <div className="absolute inset-3 border border-cover-accent/20 rounded-cover pointer-events-none" />

        {/* Small Wax Seal Badge */}
        <div className="w-12 h-12 rounded-full bg-linear-to-tr from-amber-700 via-amber-500 to-amber-200 border-2 border-amber-900/40 shadow-md flex items-center justify-center mb-6">
          <span className="font-title text-stone-900 font-bold text-lg select-none">
            ✦
          </span>
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-cover-accent/70 mb-2">
          A Keepsake Birthday Gift
        </span>

        <h1 className="font-title text-3xl sm:text-4xl font-bold text-cover-accent mb-3 tracking-tight">
          Happy Birthday, {siteConfig.recipientName}
        </h1>

        <p className="font-hand text-xl sm:text-2xl text-accent mb-8 max-w-md leading-relaxed">
          {siteConfig.coverMessage}
        </p>

        {/* "Open the Book" Button */}
        <button
          onClick={handleOpenClick}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-linear-to-r from-cover-accent via-amber-200 to-cover-accent text-stone-950 font-semibold shadow-lg hover:shadow-cover-accent/30 hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base cursor-pointer"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">
            📖
          </span>
          <span>Open the Book & Play Song</span>
          <span className="font-mono text-xs opacity-75">♪</span>
        </button>

        <span className="font-body text-[11px] text-stone-400/80 mt-5">
          Tap anywhere to unfold our memories with gentle music
        </span>
      </div>
    </div>
  );
};

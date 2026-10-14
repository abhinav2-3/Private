"use client";

import React from "react";
import { StickerItem } from "@/types";

interface StickerProps {
  sticker: StickerItem;
}

export const Sticker: React.FC<StickerProps> = ({ sticker }) => {
  const { type, rotation = 0, size = 32, label, color } = sticker;

  const renderIcon = () => {
    switch (type) {
      case "heart":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-full h-full drop-shadow-sm transition-transform hover:scale-110 duration-200 ${color || "text-accent"
              }`}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );

      case "sparkle":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-full h-full drop-shadow-sm animate-pulse ${color || "text-cover-accent"
              }`}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        );

      case "star":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-full h-full drop-shadow-sm ${color || "text-cover-accent"
              }`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );

      case "pin":
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-linear-to-tr from-amber-700 via-amber-400 to-amber-200 shadow-md border border-amber-800/40" />
            <div className="absolute top-3 w-1 h-3 bg-linear-to-b from-stone-400 to-stone-600 rounded-b shadow-sm" />
          </div>
        );

      case "stamp":
        return (
          <div className="px-2 py-1 border-2 border-dashed border-accent/60 rounded text-[10px] font-mono tracking-widest uppercase text-accent -rotate-6 bg-paper/90 shadow-sm">
            {label || "POSTAGE • LOVE"}
          </div>
        );

      case "tape":
        return (
          <div className="washi-tape w-16 h-5 rounded-sm shadow-sm" />
        );

      default:
        return (
          <span className="font-hand text-xl text-accent select-none">
            {label || "✦"}
          </span>
        );
    }
  };

  return (
    <div
      className="absolute pointer-events-none select-none z-20 flex flex-col items-center justify-center"
      style={{
        left: `${(sticker.x / 200) * 100}%`,
        top: `${sticker.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {renderIcon()}
      {label && type !== "stamp" && (
        <span className="font-hand text-xs text-ink-muted mt-0.5 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};

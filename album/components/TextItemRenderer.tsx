"use client";

import React from "react";
import { TextItem } from "@/types";

interface TextItemRendererProps {
  item: TextItem;
}

export const TextItemRenderer: React.FC<TextItemRendererProps> = ({ item }) => {
  const { x, y, text, style = "hand", fontSize, rotation = 0, maxWidth, color } = item;
  const isCentered = x === 50 || x === 100 || x === 150;

  // Determine font and style classes
  const getStyleClasses = () => {
    switch (style) {
      case "title":
        return "font-title text-ink font-bold tracking-tight";
      case "body":
        return "font-body text-ink-muted leading-relaxed";
      case "letter":
        return "font-body text-ink leading-relaxed font-normal";
      case "date":
        return "font-mono uppercase tracking-widest text-ink-muted/80 text-[11px]";
      case "quote":
        return "font-title italic text-ink";
      case "hand":
      default:
        return "font-hand text-accent leading-snug";
    }
  };

  // Make font size classes responsive so text doesn't overflow on small pages
  const getResponsiveFontClass = (rawFont?: string) => {
    if (!rawFont) return "text-xs sm:text-sm md:text-base";
    return rawFont
      .replace(/\btext-4xl\b/g, "text-2xl sm:text-3xl md:text-4xl")
      .replace(/\btext-3xl\b/g, "text-xl sm:text-2xl md:text-3xl")
      .replace(/\btext-2xl\b/g, "text-base sm:text-xl md:text-2xl")
      .replace(/\btext-xl\b/g, "text-sm sm:text-base md:text-xl")
      .replace(/\btext-lg\b/g, "text-xs sm:text-sm md:text-lg")
      .replace(/\btext-sm\b/g, "text-[11px] sm:text-xs md:text-sm")
      .replace(/\btext-\[10px\]\b/g, "text-[8px] sm:text-[9px] md:text-[10px]");
  };

  return (
    <div
      className={`absolute z-20 pointer-events-none select-none ${getStyleClasses()} ${
        isCentered ? "text-center" : "text-left"
      } ${color || ""}`}
      style={{
        left: `${(x / 200) * 100}%`,
        top: `${y}%`,
        transform: `${isCentered ? "translateX(-50%)" : ""} rotate(${rotation}deg)`,
        width: maxWidth ? `${(maxWidth / 200) * 100}%` : undefined,
      }}
    >
      <div className={getResponsiveFontClass(fontSize)}>{text}</div>
    </div>
  );
};

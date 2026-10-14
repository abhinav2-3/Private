"use client";

import React from "react";
import { TextItem } from "@/types";

interface TextItemRendererProps {
  item: TextItem;
}

export const TextItemRenderer: React.FC<TextItemRendererProps> = ({ item }) => {
  const { x, y, text, style = "hand", fontSize, rotation = 0, maxWidth, color } = item;

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

  const isCentered = x === 50 || x === 100 || x === 150;

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
      <div className={fontSize || "text-base"}>{text}</div>
    </div>
  );
};

"use client";

import React from "react";
import { FallingLeaves } from "falling-leaves/react";
import type { LeafShape } from "falling-leaves";

export interface FallingLeavesOverlayProps {
  enabled?: boolean;
  shapes?: LeafShape[];
  count?: number;
  speed?: [number, number] | number;
  wind?: [number, number] | number;
  sway?: [number, number] | number;
  zIndex?: number;
  onlyInFall?: boolean;
}

/**
 * Checks if current month is in Fall/Autumn (September, October, November)
 */
export function isFallSeason(): boolean {
  const month = new Date().getMonth();
  return month >= 8 && month <= 10;
}

export const FallingLeavesOverlay: React.FC<FallingLeavesOverlayProps> = ({
  enabled = true,
  shapes = ["maple", "oak", "ginkgo", "birch"],
  count = 35,
  speed = [0.8, 1.8],
  wind = [-0.2, 0.8],
  sway = [0.6, 1.6],
  zIndex = 25,
  onlyInFall = false,
}) => {
  if (onlyInFall && !isFallSeason()) {
    return null;
  }

  if (!enabled) return null;

  return (
    <FallingLeaves
      fullScreen
      shapes={shapes}
      count={count}
      speed={speed}
      wind={wind}
      sway={sway}
      zIndex={zIndex}
    />
  );
};

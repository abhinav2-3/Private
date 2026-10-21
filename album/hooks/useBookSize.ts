"use client";

import { useState, useEffect } from "react";

export interface BookDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  mounted: boolean;
}

export function useBookSize(): BookDimensions {
  const [dimensions, setDimensions] = useState<BookDimensions>({
    width: 440,
    height: 580,
    isMobile: false,
    mounted: false,
  });

  useEffect(() => {
    function calculateSize() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      // Single page below 960px or portrait orientation
      const isMobile = windowWidth < 960 || (windowWidth < 1024 && windowHeight > windowWidth);

      // Available space with margins for controls and ambient background
      const availableHeight = Math.max(
        windowHeight - (windowHeight < 640 ? 95 : isMobile ? 115 : 110),
        280
      );
      const availableWidth = isMobile
        ? Math.min(windowWidth - (windowWidth < 480 ? 16 : 28), 540)
        : Math.min(windowWidth - 48, 1200);

      const targetAspectRatio = 1.30; // Height / Width for a single page

      let pageWidth: number;
      let pageHeight: number;

      if (isMobile) {
        // Mobile / Tablet Portrait: 1 page displayed at a time, maximize viewport
        pageWidth = availableWidth;
        pageHeight = Math.round(pageWidth * targetAspectRatio);

        if (pageHeight > availableHeight) {
          pageHeight = availableHeight;
          pageWidth = Math.round(pageHeight / targetAspectRatio);
        }
      } else {
        // Desktop / Landscape: 2 pages side-by-side
        const maxSpreadWidth = availableWidth;
        const maxSingleWidth = maxSpreadWidth / 2;

        pageWidth = maxSingleWidth;
        pageHeight = Math.round(pageWidth * targetAspectRatio);

        if (pageHeight > availableHeight) {
          pageHeight = availableHeight;
          pageWidth = Math.round(pageHeight / targetAspectRatio);
        }
      }

      setDimensions({
        width: Math.max(Math.round(pageWidth), 240),
        height: Math.max(Math.round(pageHeight), 310),
        isMobile,
        mounted: true,
      });
    }

    calculateSize();
    window.addEventListener("resize", calculateSize);
    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  return dimensions;
}

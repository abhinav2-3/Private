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
      const isMobile = windowWidth < 768;

      // Available space with margins for controls and ambient background
      const availableHeight = Math.max(windowHeight - (isMobile ? 130 : 110), 380);
      const availableWidth = isMobile
        ? Math.min(windowWidth - 24, 460)
        : Math.min(windowWidth - 64, 1150);

      const targetAspectRatio = 1.32; // Height / Width for a single page

      let pageWidth: number;
      let pageHeight: number;

      if (isMobile) {
        // Mobile: 1 page displayed at a time
        pageWidth = availableWidth;
        pageHeight = Math.round(pageWidth * targetAspectRatio);

        if (pageHeight > availableHeight) {
          pageHeight = availableHeight;
          pageWidth = Math.round(pageHeight / targetAspectRatio);
        }
      } else {
        // Desktop: 2 pages side-by-side
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
        width: Math.max(Math.round(pageWidth), 280),
        height: Math.max(Math.round(pageHeight), 370),
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

"use client";

import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import dynamic from "next/dynamic";
import { SpreadData, PhotoItem } from "@/types";
import { useBookSize } from "@/hooks/useBookSize";
import { BookPage } from "./BookPage";
import { SpreadCanvas } from "./SpreadCanvas";

// Dynamically import HTMLFlipBook to disable SSR
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-cover border border-cover-accent/30 rounded-cover shadow-book">
      <div className="w-8 h-8 rounded-full border-2 border-cover-accent border-t-transparent animate-spin mb-4" />
      <span className="font-title text-cover-accent text-lg">Opening Keepsake Album...</span>
    </div>
  ),
}) as any;

export interface BookHandle {
  flipNext: () => void;
  flipPrev: () => void;
  goToPage: (pageIndex: number) => void;
  getCurrentPage: () => number;
  getTotalPages: () => number;
}

interface BookProps {
  spreads: SpreadData[];
  onPageChange?: (currentPage: number, totalPages: number) => void;
  onPhotoClick?: (photo: PhotoItem) => void;
  className?: string;
}

export const Book = forwardRef<BookHandle, BookProps>(
  ({ spreads, onPageChange, onPhotoClick, className = "" }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookRef = useRef<any>(null);
    const { width, height, isMobile, mounted } = useBookSize();
    const [currentPage, setCurrentPage] = useState(0);

    // Cover spread is index 0, back-cover is the last spread
    const coverSpread = spreads[0];
    const backCoverSpread = spreads[spreads.length - 1];
    const innerSpreads = spreads.slice(1, spreads.length - 1);

    // Expose flipbook controls to parent
    useImperativeHandle(ref, () => ({
      flipNext: () => {
        bookRef.current?.pageFlip()?.flipNext();
      },
      flipPrev: () => {
        bookRef.current?.pageFlip()?.flipPrev();
      },
      goToPage: (pageIndex: number) => {
        bookRef.current?.pageFlip()?.flip(pageIndex);
      },
      getCurrentPage: () => currentPage,
      getTotalPages: () => totalPagesCount,
    }));

    // Handle flip event from HTMLFlipBook
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFlip = (e: any) => {
      const page = typeof e.data === "number" ? e.data : 0;
      setCurrentPage(page);
      if (onPageChange) {
        onPageChange(page, totalPagesCount);
      }
    };

    // Total pages calculation:
    // Page 0: Front Cover
    // Inner pages: innerSpreads.length * 2
    // Last page: Back Cover
    const totalPagesCount = 1 + innerSpreads.length * 2 + 1;

    if (!mounted) {
      return (
        <div
          className="flex items-center justify-center bg-cover/80 border border-cover-accent/30 rounded-cover shadow-book"
          style={{ width: width * (isMobile ? 1 : 2), height }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-cover-accent border-t-transparent animate-spin" />
        </div>
      );
    }

    return (
      <div
        className={`relative flex items-center justify-center select-none ${className}`}
        style={{
          width: isMobile ? width : width * 2,
          height,
        }}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={width}
          height={height}
          size="fixed"
          minWidth={280}
          maxWidth={600}
          minHeight={370}
          maxHeight={800}
          maxShadowOpacity={0.55}
          showCover={true}
          mobileScrollSupport={false}
          flippingTime={750}
          usePortrait={isMobile}
          startPage={0}
          drawShadow={true}
          clickEventForward={true}
          useMouseEvents={true}
          showPageCorners={true}
          onFlip={handleFlip}
          className="album-flipbook transition-opacity duration-300"
          style={{ margin: "0 auto" }}
        >
          {/* Page 0: Front Cover (Right-side closed cover) */}
          <BookPage isHardCover={true} className="border-r border-cover-accent/30">
            <SpreadCanvas
              spread={coverSpread}
              side="right"
              onPhotoClick={onPhotoClick}
            />
          </BookPage>

          {/* Inner Spreads: Each spread becomes Left Page & Right Page */}
          {innerSpreads.map((spread, index) => {
            const leftPageNum = 1 + index * 2;
            const rightPageNum = leftPageNum + 1;
            return [
              <BookPage key={`${spread.id}-left`} isHardCover={false}>
                <SpreadCanvas
                  spread={spread}
                  side="left"
                  pageNumber={leftPageNum}
                  onPhotoClick={onPhotoClick}
                />
              </BookPage>,
              <BookPage key={`${spread.id}-right`} isHardCover={false}>
                <SpreadCanvas
                  spread={spread}
                  side="right"
                  pageNumber={rightPageNum}
                  onPhotoClick={onPhotoClick}
                />
              </BookPage>,
            ];
          })}

          {/* Last Page: Back Cover (Left-side closed cover) */}
          <BookPage isHardCover={true} className="border-l border-cover-accent/30">
            <SpreadCanvas
              spread={backCoverSpread}
              side="left"
              onPhotoClick={onPhotoClick}
            />
          </BookPage>
        </HTMLFlipBook>
      </div>
    );
  }
);

Book.displayName = "Book";

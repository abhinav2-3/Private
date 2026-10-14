"use client";

import React, { useRef, useState, useEffect } from "react";
import { SAMPLE_SPREADS } from "@/data/pages";
import { siteConfig } from "@/config/site";
import { Book, BookHandle } from "@/components/Book";
import { PhotoItem } from "@/types";

export default function HomePage() {
  const bookRef = useRef<BookHandle>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(22);
  const [activeModalPhoto, setActiveModalPhoto] = useState<PhotoItem | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        bookRef.current?.flipNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        bookRef.current?.flipPrev();
      } else if (e.key === "Escape") {
        setActiveModalPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePageChange = (page: number, total: number) => {
    setCurrentPage(page);
    setTotalPages(total);
  };

  const getPageIndicatorText = () => {
    if (currentPage === 0) return "Front Cover";
    if (currentPage >= totalPages - 1) return "Back Cover";
    const leftNum = currentPage % 2 === 1 ? currentPage : currentPage - 1;
    const rightNum = leftNum + 1;
    return `Pages ${leftNum}–${Math.min(rightNum, totalPages - 2)} of ${totalPages - 2}`;
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col items-center justify-between p-3 sm:p-6 select-none">
      {/* Top Floating Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex flex-col">
          <span className="font-title text-base sm:text-lg text-cover-accent font-semibold tracking-wide">
            {siteConfig.albumTitle}
          </span>
          <span className="font-hand text-xs sm:text-sm text-stone-400">
            Dedicated to {siteConfig.recipientName} • {siteConfig.date}
          </span>
        </div>

        {/* Page status pill */}
        <div className="flex items-center gap-2 px-3 py-1 bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-full text-xs font-mono text-stone-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cover-accent" />
          <span>{getPageIndicatorText()}</span>
        </div>
      </header>

      {/* Centered Book Stage */}
      <main className="flex-1 w-full flex items-center justify-center my-auto relative z-20">
        <Book
          ref={bookRef}
          spreads={SAMPLE_SPREADS}
          onPageChange={handlePageChange}
          onPhotoClick={setActiveModalPhoto}
        />
      </main>

      {/* Bottom Floating Navigation Controls */}
      <footer className="w-full max-w-lg flex items-center justify-center gap-4 z-30 pointer-events-auto pb-2">
        <button
          onClick={() => bookRef.current?.flipPrev()}
          disabled={currentPage === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900/85 hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none text-stone-200 border border-stone-800 backdrop-blur-md transition-all shadow-md text-xs sm:text-sm font-medium"
        >
          <span>←</span>
          <span>Previous</span>
        </button>

        {/* First Page / Cover Quick Button */}
        <button
          onClick={() => bookRef.current?.goToPage(0)}
          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
            currentPage === 0
              ? "bg-cover-accent/20 border-cover-accent text-cover-accent"
              : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200"
          }`}
        >
          Cover
        </button>

        <button
          onClick={() => bookRef.current?.flipNext()}
          disabled={currentPage >= totalPages - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900/85 hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none text-stone-200 border border-stone-800 backdrop-blur-md transition-all shadow-md text-xs sm:text-sm font-medium"
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </footer>

      {/* Photo Inspection Modal */}
      {activeModalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="bg-paper text-ink p-4 sm:p-6 rounded-page shadow-book max-w-xl w-full relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalPhoto(null)}
              className="absolute top-3 right-3 text-ink-muted hover:text-ink text-xl font-bold w-8 h-8 rounded-full bg-stone-200/70 flex items-center justify-center transition-colors"
            >
              ×
            </button>
            <div className="relative w-full aspect-4/3 rounded-xs overflow-hidden shadow-photo bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalPhoto.src}
                alt={activeModalPhoto.alt}
                className="w-full h-full object-cover"
              />
            </div>
            {activeModalPhoto.caption && (
              <p className="font-hand text-2xl text-accent mt-4 text-center">
                {activeModalPhoto.caption}
              </p>
            )}
            {activeModalPhoto.location && (
              <p className="font-mono text-xs text-ink-muted mt-1 uppercase tracking-wider">
                📍 {activeModalPhoto.location} {activeModalPhoto.date ? `• ${activeModalPhoto.date}` : ""}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

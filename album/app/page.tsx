"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { SAMPLE_SPREADS } from "@/data/pages";
import { siteConfig } from "@/config/site";
import { Book, BookHandle } from "@/components/Book";
import { IntroCurtain } from "@/components/IntroCurtain";
import { MusicBar } from "@/components/MusicBar";
import { FullscreenButton } from "@/components/FullscreenButton";
import { ImageModal } from "@/components/ImageModal";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { PhotoItem } from "@/types";

export default function HomePage() {
  const bookRef = useRef<BookHandle>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(22);
  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Background music hook
  const music = useMusicPlayer({
    src: siteConfig.music.src,
    volume: 0.55,
    loop: true,
  });

  // Extract all photos across all spreads for cycling in the modal
  const allAlbumPhotos = useMemo(() => {
    return SAMPLE_SPREADS.flatMap((spread) => spread.photos);
  }, []);

  const activePhoto =
    activePhotoIndex !== null && activePhotoIndex >= 0
      ? allAlbumPhotos[activePhotoIndex]
      : null;

  // Handle photo click from any slot
  const handlePhotoClick = (clickedPhoto: PhotoItem) => {
    const idx = allAlbumPhotos.findIndex(
      (p) => p.slotId === clickedPhoto.slotId && p.src === clickedPhoto.src
    );
    setActivePhotoIndex(idx !== -1 ? idx : 0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If modal is active, modal handles its own arrows & escape
      if (activePhotoIndex !== null) return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        bookRef.current?.flipNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        bookRef.current?.flipPrev();
      } else if (e.key === "Home") {
        bookRef.current?.goToPage(0);
      } else if (e.key === "End") {
        bookRef.current?.goToPage(totalPages - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, totalPages]);

  // Handle "Open the Book" from intro curtain
  const handleOpenBook = () => {
    setHasOpenedIntro(true);
    // Start music playback
    music.play();
    // Smoothly flip open from front cover to first spread
    setTimeout(() => {
      bookRef.current?.flipNext();
    }, 600);
  };

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
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col items-center justify-between p-3 sm:p-5 select-none">
      {/* Intro Overlay Curtain (Satisfies browser audio gesture requirement) */}
      {!hasOpenedIntro && <IntroCurtain onOpen={handleOpenBook} />}

      {/* Top Floating Control Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between z-30 pointer-events-auto">
        {/* Album Title */}
        <div className="flex flex-col">
          <span className="font-title text-base sm:text-lg text-cover-accent font-semibold tracking-wide flex items-center gap-2">
            <span>{siteConfig.albumTitle}</span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cover-accent/15 text-cover-accent border border-cover-accent/30">
              For {siteConfig.recipientName}
            </span>
          </span>
          <span className="font-hand text-xs text-stone-400">
            {siteConfig.date} • {siteConfig.senderName}
          </span>
        </div>

        {/* Top Controls: Music + Page Pill + Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3">
          <MusicBar
            isPlaying={music.isPlaying}
            isMuted={music.isMuted}
            onTogglePlay={music.togglePlay}
            onToggleMute={music.toggleMute}
          />

          {/* Page Counter Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-full text-xs font-mono text-stone-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cover-accent animate-pulse" />
            <span>{getPageIndicatorText()}</span>
          </div>

          <FullscreenButton />
        </div>
      </header>

      {/* Centered Book Stage */}
      <main className="flex-1 w-full flex items-center justify-center my-auto relative z-20">
        <Book
          ref={bookRef}
          spreads={SAMPLE_SPREADS}
          onPageChange={handlePageChange}
          onPhotoClick={handlePhotoClick}
        />
      </main>

      {/* Bottom Floating Navigation Controls */}
      <footer className="w-full max-w-xl flex items-center justify-between gap-3 z-30 pointer-events-auto pb-1">
        {/* Previous Button */}
        <button
          onClick={() => bookRef.current?.flipPrev()}
          disabled={currentPage === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900/85 hover:bg-stone-800 disabled:opacity-25 disabled:pointer-events-none text-stone-200 border border-stone-800 backdrop-blur-md transition-all shadow-md text-xs sm:text-sm font-medium cursor-pointer"
        >
          <span>←</span>
          <span>Previous</span>
        </button>

        {/* Quick Jump Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => bookRef.current?.goToPage(0)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
              currentPage === 0
                ? "bg-cover-accent/20 border-cover-accent text-cover-accent font-semibold"
                : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200"
            }`}
          >
            Cover
          </button>

          {/* Mobile Page Indicator */}
          <span className="md:hidden font-mono text-[11px] text-stone-400 px-2">
            {getPageIndicatorText()}
          </span>

          <button
            onClick={() => bookRef.current?.goToPage(totalPages - 1)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
              currentPage >= totalPages - 1
                ? "bg-cover-accent/20 border-cover-accent text-cover-accent font-semibold"
                : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200"
            }`}
          >
            End
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={() => bookRef.current?.flipNext()}
          disabled={currentPage >= totalPages - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900/85 hover:bg-stone-800 disabled:opacity-25 disabled:pointer-events-none text-stone-200 border border-stone-800 backdrop-blur-md transition-all shadow-md text-xs sm:text-sm font-medium cursor-pointer"
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </footer>

      {/* Fullscreen Photo Inspection Modal */}
      <ImageModal
        photo={activePhoto}
        onClose={() => setActivePhotoIndex(null)}
        onNext={() =>
          setActivePhotoIndex((prev) =>
            prev !== null && prev < allAlbumPhotos.length - 1 ? prev + 1 : prev
          )
        }
        onPrev={() =>
          setActivePhotoIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : prev
          )
        }
        hasNext={activePhotoIndex !== null && activePhotoIndex < allAlbumPhotos.length - 1}
        hasPrev={activePhotoIndex !== null && activePhotoIndex > 0}
      />
    </div>
  );
}

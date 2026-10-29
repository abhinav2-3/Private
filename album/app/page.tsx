"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { SAMPLE_SPREADS } from "@/data/pages";
import { siteConfig } from "@/config/site";
import { Book, BookHandle } from "@/components/Book";
import { StoryView } from "@/components/StoryView";
import { IntroCurtain } from "@/components/IntroCurtain";
import { MusicBar } from "@/components/MusicBar";
import { FullscreenButton } from "@/components/FullscreenButton";
import { ImageModal } from "@/components/ImageModal";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { PhotoItem } from "@/types";

export default function HomePage() {
  const bookRef = useRef<BookHandle>(null);
  const [viewMode, setViewMode] = useState<"book" | "story">("book");
  const [currentPage, setCurrentPage] = useState(0);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(22);
  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Background music hook
  const music = useMusicPlayer({
    src: siteConfig.music.src,
    volume: 0.55,
    loop: true,
  });

  // Auto-detect mobile screen on initial mount and set default mode
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const timer = setTimeout(() => {
        setViewMode("story");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  // Extract all photos across all spreads for cycling in the modal
  const allAlbumPhotos = useMemo(() => {
    return SAMPLE_SPREADS.flatMap((spread) => spread.photos);
  }, []);

  const activePhoto =
    activePhotoIndex !== null && activePhotoIndex >= 0
      ? allAlbumPhotos[activePhotoIndex]
      : null;

  // Preload all album photos into browser cache for instantaneous zero-flicker page turns
  useEffect(() => {
    allAlbumPhotos.forEach((photo) => {
      if (
        photo.src &&
        !photo.src.endsWith(".mp4") &&
        !photo.src.endsWith(".webm") &&
        photo.mediaType !== "video"
      ) {
        const img = new Image();
        img.src = photo.src;
      }
    });
  }, [allAlbumPhotos]);

  // Convert book page index (0..21) to spread index (0..11)
  const pageToSpread = (page: number): number => {
    if (page <= 0) return 0;
    if (page >= totalPages - 1) return SAMPLE_SPREADS.length - 1;
    return Math.min(Math.floor((page + 1) / 2), SAMPLE_SPREADS.length - 1);
  };

  // Convert spread index (0..11) to book page index (0..21)
  const spreadToPage = (spreadIdx: number): number => {
    if (spreadIdx <= 0) return 0;
    if (spreadIdx >= SAMPLE_SPREADS.length - 1) return totalPages - 1;
    return spreadIdx * 2 - 1;
  };

  // Switch between 3D Book Mode and Mobile Story Mode with synced position
  const handleSwitchMode = (mode: "book" | "story") => {
    if (mode === viewMode) return;
    if (mode === "book") {
      const targetPage = spreadToPage(activeSpreadIndex);
      setCurrentPage(targetPage);
      setTimeout(() => {
        bookRef.current?.goToPage(targetPage);
      }, 50);
    } else {
      const targetSpread = pageToSpread(currentPage);
      setActiveSpreadIndex(targetSpread);
    }
    setViewMode(mode);
  };

  // Handle photo click from any slot (Book or StoryView)
  const handlePhotoClick = (clickedPhoto: PhotoItem) => {
    const idx = allAlbumPhotos.findIndex(
      (p) => p.slotId === clickedPhoto.slotId && p.src === clickedPhoto.src
    );
    setActivePhotoIndex(idx !== -1 ? idx : 0);
  };

  // Keyboard navigation for Book mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If modal is active, modal handles its own arrows & escape
      if (activePhotoIndex !== null) return;
      if (viewMode !== "book") return;

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
  }, [activePhotoIndex, totalPages, viewMode]);

  // Handle "Open the Book" from intro curtain
  const handleOpenBook = () => {
    setHasOpenedIntro(true);
    music.play();
    setTimeout(() => {
      if (viewMode === "book") {
        bookRef.current?.flipNext();
      } else {
        setActiveSpreadIndex(1);
        setCurrentPage(1);
      }
    }, 600);
  };

  const handlePageChange = (page: number, total: number) => {
    setCurrentPage(page);
    setTotalPages(total);
    setActiveSpreadIndex(pageToSpread(page));
  };

  const handleSpreadChange = (spreadIdx: number) => {
    setActiveSpreadIndex(spreadIdx);
    setCurrentPage(spreadToPage(spreadIdx));
  };

  const getPageIndicatorText = () => {
    if (currentPage === 0) return "Front Cover";
    if (currentPage >= totalPages - 1) return "Back Cover";
    const leftNum = currentPage % 2 === 1 ? currentPage : currentPage - 1;
    const rightNum = leftNum + 1;
    return `Pages ${leftNum}–${Math.min(rightNum, totalPages - 2)} of ${totalPages - 2}`;
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col items-center justify-between p-2.5 sm:p-5 select-none">
      {/* Intro Overlay Curtain (Satisfies browser audio gesture requirement) */}
      {!hasOpenedIntro && <IntroCurtain onOpen={handleOpenBook} />}

      {/* Top Floating Control Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between gap-2 z-30 pointer-events-auto">
        {/* Album Title */}
        <div className="flex flex-col min-w-0">
          <span className="font-title text-sm sm:text-lg text-cover-accent font-semibold tracking-wide flex items-center gap-1.5 truncate">
            <span>{siteConfig.albumTitle}</span>
            <span className="hidden md:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cover-accent/15 text-cover-accent border border-cover-accent/30 shrink-0">
              For {siteConfig.recipientName}
            </span>
          </span>
          <span className="hidden sm:inline-block font-hand text-xs text-stone-400">
            {siteConfig.date} • {siteConfig.senderName}
          </span>
        </div>

        {/* Dual Mode Switcher + Music + Counter + Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Dual Mode Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-full bg-stone-900/90 border border-stone-800 shadow-md backdrop-blur-md">
            <button
              onClick={() => handleSwitchMode("book")}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                viewMode === "book"
                  ? "bg-cover-accent/25 text-cover-accent border border-cover-accent/40 shadow-xs"
                  : "text-stone-400 hover:text-stone-200 border border-transparent"
              }`}
            >
              <span>📖</span>
              <span className="hidden sm:inline">Book View</span>
              <span className="sm:hidden">Book</span>
            </button>
            <button
              onClick={() => handleSwitchMode("story")}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                viewMode === "story"
                  ? "bg-cover-accent/25 text-cover-accent border border-cover-accent/40 shadow-xs"
                  : "text-stone-400 hover:text-stone-200 border border-transparent"
              }`}
            >
              <span>✨</span>
              <span className="hidden sm:inline">Story View</span>
              <span className="sm:hidden">Story</span>
            </button>
          </div>

          {/* Music Player */}
          <MusicBar
            isPlaying={music.isPlaying}
            isMuted={music.isMuted}
            onTogglePlay={music.togglePlay}
            onToggleMute={music.toggleMute}
          />

          {/* Desktop Page Counter (Book Mode) */}
          {viewMode === "book" && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-full text-xs font-mono text-stone-300 shadow-sm shrink-0">
              <span className="w-2 h-2 rounded-full bg-cover-accent animate-pulse" />
              <span>{getPageIndicatorText()}</span>
            </div>
          )}

          <FullscreenButton />
        </div>
      </header>

      {/* Centered Main Stage: Book or StoryView */}
      <main className="flex-1 w-full flex items-center justify-center my-auto relative z-20 min-h-0 overflow-hidden">
        {viewMode === "book" ? (
          <Book
            ref={bookRef}
            spreads={SAMPLE_SPREADS}
            onPageChange={handlePageChange}
            onPhotoClick={handlePhotoClick}
            initialPage={currentPage}
          />
        ) : (
          <StoryView
            spreads={SAMPLE_SPREADS}
            activeSpreadIndex={activeSpreadIndex}
            onSpreadChange={handleSpreadChange}
            onPhotoClick={handlePhotoClick}
          />
        )}
      </main>

      {/* Bottom Floating Navigation Controls (Book Mode only, Story has integrated controls) */}
      {viewMode === "book" && (
        <footer className="w-full max-w-xl flex items-center justify-between gap-3 z-30 pointer-events-auto pb-1">
          {/* Previous Button */}
          <button
            onClick={() => bookRef.current?.flipPrev()}
            disabled={currentPage === 0}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-stone-900/85 hover:bg-stone-800 disabled:opacity-25 disabled:pointer-events-none text-stone-200 border border-stone-800 backdrop-blur-md transition-all shadow-md text-xs sm:text-sm font-medium cursor-pointer"
          >
            <span>←</span>
            <span>Previous</span>
          </button>

          {/* Quick Jump Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => bookRef.current?.goToPage(0)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                currentPage === 0
                  ? "bg-cover-accent/20 border-cover-accent text-cover-accent font-semibold"
                  : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200"
              }`}
            >
              Cover
            </button>

            {/* Mobile Page Indicator */}
            <span className="lg:hidden font-mono text-[11px] text-stone-400 px-1 sm:px-2">
              {getPageIndicatorText()}
            </span>

            <button
              onClick={() => bookRef.current?.goToPage(totalPages - 1)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
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
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-stone-900/85 hover:bg-stone-800 disabled:opacity-25 disabled:pointer-events-none text-stone-200 border border-stone-800 backdrop-blur-md transition-all shadow-md text-xs sm:text-sm font-medium cursor-pointer"
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </footer>
      )}

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

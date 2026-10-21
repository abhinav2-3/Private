"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Calendar,
  RotateCcw,
  Sparkles,
  Heart,
} from "lucide-react";
import { PhotoItem, SpreadData } from "@/types";
import { siteConfig } from "@/config/site";

interface StoryViewProps {
  spreads: SpreadData[];
  activeSpreadIndex: number;
  onSpreadChange: (index: number) => void;
  onPhotoClick: (photo: PhotoItem) => void;
  className?: string;
}

export const StoryView: React.FC<StoryViewProps> = ({
  spreads,
  activeSpreadIndex,
  onSpreadChange,
  onPhotoClick,
  className = "",
}) => {
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalSpreads = spreads.length;
  const currentSpread = spreads[activeSpreadIndex] || spreads[0];
  const isCover = currentSpread.template === "cover";
  const isBackCover = currentSpread.template === "back-cover";
  const isLetter = currentSpread.template === "letter-and-moments";
  const isPanoramic = currentSpread.template === "panoramic-spread";

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (activeSpreadIndex < totalSpreads - 1) {
      setSlideDirection(1);
      onSpreadChange(activeSpreadIndex + 1);
    }
  }, [activeSpreadIndex, totalSpreads, onSpreadChange]);

  const goToPrev = useCallback(() => {
    if (activeSpreadIndex > 0) {
      setSlideDirection(-1);
      onSpreadChange(activeSpreadIndex - 1);
    }
  }, [activeSpreadIndex, onSpreadChange]);

  const jumpTo = (index: number) => {
    setSlideDirection(index > activeSpreadIndex ? 1 : -1);
    onSpreadChange(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Helper title for each chapter
  const getChapterTitle = () => {
    if (isCover) return "Cover • Keepsake Archive";
    if (isBackCover) return "The Next Chapter";
    if (isLetter) return "A Heartfelt Letter";
    if (isPanoramic) return "The Horizon Ahead";
    return `Memory ${activeSpreadIndex} of ${totalSpreads - 2}`;
  };

  // Render a clickable photo card with uniform polaroid borders
  const renderPhotoCard = (
    photo: PhotoItem,
    customClass: string = "h-full w-full",
    showCaption: boolean = true
  ) => {
    return (
      <div
        key={photo.slotId || photo.src}
        onClick={(e) => {
          e.stopPropagation();
          onPhotoClick(photo);
        }}
        className={`group relative bg-white p-1 sm:p-1.5 rounded-sm shadow-md transition-all duration-200 hover:shadow-xl active:scale-[0.98] cursor-pointer flex flex-col ${customClass}`}
      >
        {/* Photo Image Container */}
        <div className="relative w-full flex-1 overflow-hidden rounded-xs bg-stone-900/10">
          <Image
            src={photo.src}
            alt={photo.alt || "Keepsake Photo"}
            fill
            sizes="(max-width: 640px) 90vw, 480px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Zoom Badge on Hover / Touch */}
          <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-stone-900/75 backdrop-blur-xs text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3 h-3" />
          </div>

          {/* Date Tag Pill */}
          {photo.date && (
            <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-mono text-stone-200">
              {photo.date}
            </div>
          )}
        </div>

        {/* Caption */}
        {showCaption && photo.caption && (
          <div className="pt-1 px-1 text-center shrink-0">
            <p className="font-hand text-xs sm:text-sm text-ink truncate">
              {photo.caption}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Render Spread Content according to Photo Count & Template
  const renderCardContent = () => {
    // 1. Cover Card
    if (isCover) {
      const coverPhoto = currentSpread.photos[0];
      return (
        <div className="w-full h-full flex flex-col items-center justify-between text-center py-2 px-3">
          {/* Top Badge */}
          <div className="flex items-center gap-1.5 text-cover-accent/80 font-mono text-[11px] uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-cover-accent" />
            <span>Keepsake Birthday Album</span>
            <Sparkles className="w-3 h-3 text-cover-accent" />
          </div>

          {/* Cover Title */}
          <div className="my-auto">
            <h1 className="font-title text-2xl sm:text-3xl font-bold text-cover-accent tracking-wide drop-shadow-sm">
              Happy Birthday, Betu
            </h1>
            <p className="font-hand text-base sm:text-lg text-accent mt-1">
              {siteConfig.subtitle}
            </p>
          </div>

          {/* Cover Photo */}
          {coverPhoto && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onPhotoClick(coverPhoto);
              }}
              className="relative w-44 sm:w-52 aspect-square my-auto rounded-lg overflow-hidden border-2 border-cover-accent/50 shadow-2xl p-1 bg-cover cursor-pointer group hover:scale-105 transition-transform"
            >
              <div className="relative w-full h-full rounded-sm overflow-hidden">
                <Image
                  src={coverPhoto.src}
                  alt={coverPhoto.alt}
                  fill
                  sizes="260px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-stone-900/80 text-white flex items-center justify-center">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>
          )}

          {/* Bottom Callout */}
          <div className="mt-auto pt-3 flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-cover-accent/15 border border-cover-accent/30 flex items-center justify-center text-cover-accent animate-pulse">
              <Heart className="w-4 h-4 fill-cover-accent" />
            </div>
            <span className="font-body text-[11px] text-cover-accent/70">
              Tap right or swipe left to open memories
            </span>
          </div>
        </div>
      );
    }

    // 2. Back Cover Card
    if (isBackCover) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-between text-center py-4 px-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-amber-700 via-amber-500 to-amber-200 border-2 border-amber-900/40 shadow-md flex items-center justify-center">
            <span className="font-title text-stone-900 font-bold text-base">✦</span>
          </div>

          <div className="my-auto px-4 max-w-sm">
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-cover-accent mb-3">
              To The Next Chapter
            </h2>
            <p className="font-hand text-lg sm:text-xl text-accent leading-relaxed">
              &ldquo;May this year bring you as much happiness, wonder, and magic as you give to the world every single day.&rdquo;
            </p>
            <p className="font-title text-xs text-cover-accent/70 mt-4 tracking-widest uppercase">
              Forever &amp; Always, Yours
            </p>
          </div>

          <div className="mt-auto flex flex-col items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                jumpTo(0);
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-cover-accent/20 border border-cover-accent/40 text-cover-accent hover:bg-cover-accent/30 transition-all font-medium text-xs cursor-pointer active:scale-95 shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Keepsake Album</span>
            </button>
            <span className="font-mono text-[10px] text-cover-accent/50">
              OCTOBER 2026 • HANDCRAFTED WITH LOVE
            </span>
          </div>
        </div>
      );
    }

    // 3. Letter & Moments
    if (isLetter) {
      const p1 = currentSpread.photos[0];
      const p2 = currentSpread.photos[1];
      return (
        <div className="w-full h-full flex flex-col justify-between gap-2.5">
          {/* Parchment Love Note */}
          <div className="p-3 sm:p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 shadow-xs">
            <h3 className="font-title text-lg font-bold text-accent mb-1.5 flex items-center gap-1.5">
              <span>My Dearest Betu,</span>
              <Heart className="w-3.5 h-3.5 fill-accent text-accent inline" />
            </h3>
            <p className="font-body text-xs sm:text-sm text-ink leading-relaxed">
              Another year around the sun, and your light only grows more radiant. Thank you for your kindness, your boundless optimism, and for turning every single ordinary Tuesday into an adventure I never want to end. Happy Birthday, my love.
            </p>
            <p className="font-hand text-right text-base sm:text-lg text-accent mt-2">
              — Forever &amp; Always, Yours.
            </p>
          </div>

          {/* 2 Photos Side by Side */}
          <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
            {p1 && renderPhotoCard(p1, "h-full", false)}
            {p2 && renderPhotoCard(p2, "h-full", false)}
          </div>
        </div>
      );
    }

    // 4. Panoramic Spread
    if (isPanoramic && currentSpread.photos.length > 0) {
      const panoPhoto = currentSpread.photos[0];
      return (
        <div className="w-full h-full flex flex-col justify-between py-1">
          {/* Top Title */}
          <div className="text-center pt-1 pb-2">
            <h3 className="font-title text-lg sm:text-xl font-bold text-ink">
              The Horizon Looks Brighter With You
            </h3>
            <p className="font-hand text-sm sm:text-base text-accent">
              Standing together, looking out at everything ahead
            </p>
          </div>

          {/* Panoramic Hero Photo */}
          <div className="flex-1 w-full my-auto">
            {renderPhotoCard(panoPhoto, "h-full w-full", false)}
          </div>

          {/* Caption */}
          {panoPhoto.caption && (
            <div className="text-center pt-2">
              <p className="font-hand text-base sm:text-lg text-accent">
                {panoPhoto.caption}
              </p>
            </div>
          )}
        </div>
      );
    }

    // 5. Dynamic layouts based on photo count
    const photoCount = currentSpread.photos.length;

    // 1 Photo (Single Spotlight)
    if (photoCount === 1) {
      const hero = currentSpread.photos[0];
      return (
        <div className="w-full h-full flex flex-col justify-between py-1">
          <div className="flex-1 w-full relative">
            {renderPhotoCard(hero, "h-full w-full", false)}
          </div>
          {/* Metadata & Caption */}
          <div className="text-center pt-2 shrink-0">
            {hero.caption && (
              <p className="font-hand text-base sm:text-lg text-accent">
                {hero.caption}
              </p>
            )}
            <div className="flex items-center justify-center gap-3 mt-1 font-mono text-[10px] text-ink-muted">
              {hero.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-accent" />
                  <span>{hero.location}</span>
                </span>
              )}
              {hero.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cover-accent" />
                  <span>{hero.date}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 2 Photos (Duo Classic)
    if (photoCount === 2) {
      return (
        <div className="w-full h-full flex flex-col gap-2.5">
          <div className="flex-1 min-h-0 -rotate-0.5">
            {renderPhotoCard(currentSpread.photos[0])}
          </div>
          <div className="flex-1 min-h-0 rotate-0.5">
            {renderPhotoCard(currentSpread.photos[1])}
          </div>
        </div>
      );
    }

    // 3 Photos (Trio Story)
    if (photoCount === 3) {
      return (
        <div className="w-full h-full flex flex-col gap-2">
          {/* Hero Top Photo */}
          <div className="h-[52%] w-full">
            {renderPhotoCard(currentSpread.photos[0], "h-full w-full", false)}
          </div>
          {/* 2 Companion Photos */}
          <div className="h-[48%] grid grid-cols-2 gap-2">
            {renderPhotoCard(currentSpread.photos[1], "h-full", false)}
            {renderPhotoCard(currentSpread.photos[2], "h-full", false)}
          </div>
        </div>
      );
    }

    // 4 Photos (Quad Grid / Polaroid Scatter)
    if (photoCount === 4) {
      return (
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
          {currentSpread.photos.map((p, idx) => (
            <div
              key={p.slotId || idx}
              className={`h-full min-h-0 ${
                idx % 2 === 0 ? "-rotate-0.5" : "rotate-0.5"
              }`}
            >
              {renderPhotoCard(p, "h-full", false)}
            </div>
          ))}
        </div>
      );
    }

    // 5+ Photos (Collage)
    return (
      <div className="w-full h-full flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 h-[52%]">
          {currentSpread.photos.slice(0, 2).map((p) => (
            <div key={p.slotId} className="h-full min-h-0">
              {renderPhotoCard(p, "h-full", false)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5 h-[48%]">
          {currentSpread.photos.slice(2).map((p) => (
            <div key={p.slotId} className="h-full min-h-0">
              {renderPhotoCard(p, "h-full", false)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative w-full max-w-md h-full flex flex-col justify-between mx-auto select-none touch-pan-y ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Top Segmented Progress Bar (Instagram-style) */}
      <div className="w-full px-2 pt-1 pb-1 shrink-0 z-30">
        <div className="flex items-center justify-between mb-1 text-[11px] font-mono text-stone-400">
          <span className="font-semibold text-cover-accent">{getChapterTitle()}</span>
          <span>
            {activeSpreadIndex + 1} / {totalSpreads}
          </span>
        </div>

        <div className="flex gap-1 w-full">
          {spreads.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              title={`Jump to Memory ${idx + 1}`}
              className="flex-1 h-1.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer bg-stone-800"
            >
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  idx < activeSpreadIndex
                    ? "bg-cover-accent opacity-90"
                    : idx === activeSpreadIndex
                    ? "bg-cover-accent shadow-xs shadow-cover-accent"
                    : "bg-stone-700/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Card Body with Tap-to-Turn Zones */}
      <div className="relative flex-1 w-full my-auto min-h-0 p-1 sm:p-2 flex items-center justify-center">
        {/* Invisible Left Edge Tap Zone (Prev) */}
        <div
          onClick={goToPrev}
          className="absolute left-0 top-0 bottom-0 w-1/5 z-10 cursor-pointer active:bg-white/5 transition-colors"
          title="Tap to go back"
        />

        {/* Invisible Right Edge Tap Zone (Next) */}
        <div
          onClick={goToNext}
          className="absolute right-0 top-0 bottom-0 w-1/5 z-10 cursor-pointer active:bg-white/5 transition-colors"
          title="Tap to advance"
        />

        {/* Animated Story Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSpread.id}
            initial={{ opacity: 0, x: slideDirection * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slideDirection * 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`relative w-full h-full max-h-[70vh] sm:max-h-[74vh] p-3 sm:p-4 rounded-2xl shadow-book overflow-hidden flex flex-col justify-between border ${
              isCover || isBackCover
                ? "bg-cover border-cover-accent/30 text-cover-accent"
                : "paper-surface border-paper-edge text-ink"
            }`}
          >
            {/* Washi tape accents on top corners for scrapbook cards */}
            {!isCover && !isBackCover && (
              <>
                <div className="washi-tape absolute -top-1.5 left-5 w-12 h-3.5 -rotate-6 z-20 pointer-events-none opacity-80" />
                <div className="washi-tape absolute -top-1.5 right-5 w-12 h-3.5 rotate-6 z-20 pointer-events-none opacity-80" />
              </>
            )}

            {/* Leather Gold Borders for Covers */}
            {(isCover || isBackCover) && (
              <div className="absolute inset-2 border border-cover-accent/25 rounded-xl pointer-events-none z-10" />
            )}

            {/* Dynamic Card Interior */}
            <div className="relative w-full h-full z-20 flex flex-col">
              {renderCardContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Bottom Story Navigation Bar */}
      <div className="w-full px-2 py-1 flex items-center justify-between gap-2 shrink-0 z-30">
        <button
          onClick={goToPrev}
          disabled={activeSpreadIndex === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-900/85 hover:bg-stone-800 disabled:opacity-25 disabled:pointer-events-none text-stone-200 border border-stone-800 text-xs font-medium cursor-pointer shadow-sm transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        {/* Central Jump Dots or Label */}
        <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400">
          <span>Memory</span>
          <span className="text-cover-accent font-semibold">
            {activeSpreadIndex + 1}
          </span>
          <span>of {totalSpreads}</span>
        </div>

        <button
          onClick={goToNext}
          disabled={activeSpreadIndex === totalSpreads - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-900/85 hover:bg-stone-800 disabled:opacity-25 disabled:pointer-events-none text-stone-200 border border-stone-800 text-xs font-medium cursor-pointer shadow-sm transition-all"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

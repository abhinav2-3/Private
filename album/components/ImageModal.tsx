"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { PhotoItem } from "@/types";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";

interface ImageModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
  hasPrev = false,
  hasNext = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && onNext && hasNext) {
        onNext();
      } else if (e.key === "ArrowLeft" && onPrev && hasPrev) {
        onPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Modal Card */}
      <div
        className="bg-paper text-ink p-4 sm:p-6 rounded-page shadow-book max-w-2xl w-full relative flex flex-col items-center border border-paper-edge animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          title="Close (Esc)"
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-stone-900 text-stone-200 hover:text-white border border-stone-700 shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-30 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Previous Photo Button */}
        {hasPrev && onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            title="Previous Photo"
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900/90 text-stone-200 hover:text-white border border-stone-700 shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-30 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next Photo Button */}
        {hasNext && onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            title="Next Photo"
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900/90 text-stone-200 hover:text-white border border-stone-700 shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-30 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* High-Res Photo Container */}
        <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden shadow-photo bg-stone-100">
          <Image
            src={photo.src}
            alt={photo.alt || "Album photo"}
            fill
            sizes="(max-width: 768px) 90vw, 650px"
            className="object-cover"
            priority
          />
        </div>

        {/* Polaroid Caption & Metadata */}
        <div className="w-full mt-4 flex flex-col items-center text-center">
          {photo.caption && (
            <p className="font-hand text-2xl sm:text-3xl text-accent leading-snug">
              {photo.caption}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2 font-mono text-[11px] text-ink-muted">
            {photo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-accent" />
                <span>{photo.location}</span>
              </span>
            )}
            {photo.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cover-accent" />
                <span>{photo.date}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

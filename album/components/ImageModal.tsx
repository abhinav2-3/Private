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
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Modal Card */}
      <div
        className="bg-paper text-ink p-3 sm:p-5 rounded-page shadow-book max-w-5xl w-full max-h-[94vh] relative flex flex-col items-center border border-paper-edge animate-in zoom-in-95 duration-200"
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

        {/* High-Res Photo Container - Flexible & Uncropped */}
        <div className="relative w-full h-[62vh] sm:h-[75vh] rounded-xs overflow-hidden shadow-photo bg-stone-900/10 flex items-center justify-center">
          {photo.src.endsWith(".mp4") || photo.src.endsWith(".webm") || photo.mediaType === "video" ? (
            <video
              src={photo.src}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-xs object-contain"
            />
          ) : (
            <Image
              src={photo.src}
              alt={photo.alt || "Album photo"}
              fill
              sizes="(max-width: 768px) 95vw, 1200px"
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Polaroid Caption & Metadata */}
        {(photo.caption || photo.location || photo.date) && (
          <div className="w-full mt-3 flex flex-col items-center text-center shrink-0">
            {photo.caption && (
              <p className="font-hand text-xl sm:text-2xl text-accent leading-snug">
                {photo.caption}
              </p>
            )}

            <div className="flex items-center gap-3 mt-1.5 font-mono text-[11px] text-ink-muted">
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
        )}
      </div>
    </div>
  );
};

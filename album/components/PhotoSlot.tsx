"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PhotoItem, Slot } from "@/types";

interface PhotoSlotProps {
  slot: Slot;
  photo?: PhotoItem;
  onPhotoClick?: (photo: PhotoItem) => void;
  isCover?: boolean;
}

export const PhotoSlot: React.FC<PhotoSlotProps> = ({
  slot,
  photo,
  onPhotoClick,
  isCover = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const rotation = slot.rotation ?? 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photo && onPhotoClick) {
      onPhotoClick(photo);
    }
  };

  const renderWashiTape = () => {
    switch (slot.tape) {
      case "top":
        return (
          <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 sm:h-6 rounded-xs z-20 pointer-events-none -rotate-1" />
        );
      case "top-left":
        return (
          <div className="washi-tape absolute -top-2 -left-3 w-14 sm:w-16 h-5 rounded-xs z-20 pointer-events-none -rotate-30" />
        );
      case "top-right":
        return (
          <div className="washi-tape absolute -top-2 -right-3 w-14 sm:w-16 h-5 rounded-xs z-20 pointer-events-none rotate-30" />
        );
      case "both-corners":
        return (
          <>
            <div className="washi-tape absolute -top-2 -left-3 w-12 sm:w-14 h-5 rounded-xs z-20 pointer-events-none -rotate-30" />
            <div className="washi-tape absolute -top-2 -right-3 w-12 sm:w-14 h-5 rounded-xs z-20 pointer-events-none rotate-30" />
          </>
        );
      case "none":
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:z-30"
      style={{
        left: `${(slot.x / 200) * 100}%`,
        top: `${slot.y}%`,
        width: `${(slot.width / 200) * 100}%`,
        height: `${slot.height}%`,
        transform: `rotate(${rotation}deg)`,
        zIndex: slot.zIndex || 10,
      }}
      onClick={handleClick}
    >
      {/* Tape Attachment */}
      {renderWashiTape()}

      {/* Frame Container */}
      <div
        className={`w-full h-full flex flex-col p-1.5 sm:p-2.5 transition-shadow duration-300 relative overflow-hidden ${isCover
            ? "bg-cover border-2 border-cover-accent/60 shadow-book rounded-cover"
            : "bg-white photo-card rounded-page"
          }`}
      >
        {/* Photo Container */}
        <div className="relative w-full flex-1 min-h-0 bg-stone-100 overflow-hidden rounded-xs">
          {photo?.src ? (
            <>
              {/* Blur Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
                  <span className="font-hand text-sm text-stone-400">Loading memory...</span>
                </div>
              )}
              <Image
                src={photo.src}
                alt={photo.alt || "Album photo"}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className={`object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center border border-dashed border-stone-300">
              <span className="font-hand text-stone-400 text-sm sm:text-base">
                {slot.captionPlaceholder || "Add photo here"}
              </span>
            </div>
          )}
        </div>

        {/* Polaroid Handwritten Caption Strip */}
        {photo?.caption && !isCover && (
          <div className="pt-1.5 pb-0.5 px-1 text-center shrink-0">
            <p className="font-hand text-xs sm:text-sm text-ink truncate max-w-full">
              {photo.caption}
            </p>
            {photo.date && (
              <span className="block font-mono text-[9px] text-ink-muted/80">
                {photo.date}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

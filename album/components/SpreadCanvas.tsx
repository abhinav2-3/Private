"use client";

import React from "react";
import { PhotoItem, SpreadData } from "@/types";
import { TEMPLATE_LAYOUTS } from "@/config/layouts";
import { PhotoSlot } from "./PhotoSlot";
import { TextItemRenderer } from "./TextItemRenderer";
import { Sticker } from "./Sticker";

interface SpreadCanvasProps {
  spread: SpreadData;
  side?: "left" | "right" | "full";
  onPhotoClick?: (photo: PhotoItem) => void;
  className?: string;
  pageNumber?: number;
}

export const SpreadCanvas: React.FC<SpreadCanvasProps> = ({
  spread,
  side = "full",
  onPhotoClick,
  className = "",
  pageNumber,
}) => {
  const layout = TEMPLATE_LAYOUTS[spread.template] || TEMPLATE_LAYOUTS["single-spotlight"];
  const isCover = spread.template === "cover";
  const isBackCover = spread.template === "back-cover";
  const isLeather = isCover || isBackCover;

  // Combine template default texts with spread texts
  const allTexts = [...(layout.defaultTexts || []), ...(spread.texts || [])];
  // Deduplicate by text id, favoring spread.texts
  const textsMap = new Map<string, (typeof allTexts)[0]>();
  allTexts.forEach((t) => textsMap.set(t.id, t));
  const texts = Array.from(textsMap.values());

  // Combine stickers
  const allStickers = [
    ...(layout.defaultStickers || []),
    ...(spread.stickers || []),
  ];

  // Render the inner 200x100 coordinate canvas
  const renderCanvasContent = () => (
    <div
      className={`relative w-full h-full select-none ${isLeather ? "bg-cover" : "paper-surface"
        }`}
    >
      {/* Decorative Leather Embossed Borders for Cover */}
      {isLeather && (
        <div className="absolute inset-3 sm:inset-4 border-2 border-cover-accent/30 rounded-cover pointer-events-none z-10">
          <div className="absolute inset-1 border border-cover-accent/15 rounded-cover" />
        </div>
      )}

      {/* Center Spine Crease & Shadow for Full Spread */}
      {side === "full" && !isLeather && (
        <>
          {/* Spine crease line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-paper-edge z-20 pointer-events-none" />
          {/* Spine 3D curved shadow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-12 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.08) 60%, transparent)",
            }}
          />
        </>
      )}

      {/* Photo Slots */}
      {layout.slots.map((baseSlot) => {
        const photo = spread.photos.find((p) => p.slotId === baseSlot.id);
        const slot = photo
          ? {
              ...baseSlot,
              width: photo.width ?? baseSlot.width,
              height: photo.height ?? baseSlot.height,
              x: photo.x ?? baseSlot.x,
              y: photo.y ?? baseSlot.y,
              rotation: photo.rotation ?? baseSlot.rotation,
            }
          : baseSlot;
        return (
          <PhotoSlot
            key={slot.id}
            slot={slot}
            photo={photo}
            onPhotoClick={onPhotoClick}
            isCover={isCover}
          />
        );
      })}

      {/* Text Layers */}
      {texts.map((textItem) => (
        <TextItemRenderer key={textItem.id} item={textItem} />
      ))}

      {/* Stickers */}
      {allStickers.map((sticker) => (
        <Sticker key={sticker.id} sticker={sticker} />
      ))}
    </div>
  );

  // If full spread (2:1 aspect ratio)
  if (side === "full") {
    return (
      <div
        className={`relative w-full aspect-2/1 rounded-page overflow-hidden shadow-book border border-paper-edge ${className}`}
      >
        {renderCanvasContent()}
      </div>
    );
  }

  // Clipped to Left Page (shows X: 0 to 100)
  if (side === "left") {
    return (
      <div
        className={`relative w-full h-full overflow-hidden ${isLeather ? "rounded-l-cover" : "rounded-l-page border-l border-y border-paper-edge"
          } ${className}`}
      >
        {/* Inner spread shifted to show left half */}
        <div className="absolute top-0 bottom-0 left-0 w-[200%] h-full">
          {renderCanvasContent()}
        </div>

        {/* Spine Shadow on Right Edge */}
        {!isLeather && (
          <div
            className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.04) 50%, transparent 100%)",
            }}
          />
        )}

        {/* Page Number */}
        {pageNumber && (
          <div className="absolute bottom-2 left-4 font-mono text-[10px] text-ink-muted/60 pointer-events-none z-30">
            {pageNumber}
          </div>
        )}
      </div>
    );
  }

  // Clipped to Right Page (shows X: 100 to 200)
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${isLeather ? "rounded-r-cover" : "rounded-r-page border-r border-y border-paper-edge"
        } ${className}`}
    >
      {/* Inner spread shifted left by 100% to show right half */}
      <div className="absolute top-0 bottom-0 -left-full w-[200%] h-full">
        {renderCanvasContent()}
      </div>

      {/* Spine Shadow on Left Edge */}
      {!isLeather && (
        <div
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.04) 50%, transparent 100%)",
          }}
        />
      )}

      {/* Page Number */}
      {pageNumber && (
        <div className="absolute bottom-2 right-4 font-mono text-[10px] text-ink-muted/60 pointer-events-none z-30">
          {pageNumber}
        </div>
      )}
    </div>
  );
};

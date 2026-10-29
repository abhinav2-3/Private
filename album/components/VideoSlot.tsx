"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { PhotoItem } from "@/types";

interface VideoSlotProps {
  photo: PhotoItem;
  isActive?: boolean;
  onPhotoClick?: (photo: PhotoItem) => void;
  className?: string;
  showExpand?: boolean;
}

export const VideoSlot: React.FC<VideoSlotProps> = ({
  photo,
  isActive = false,
  onPhotoClick,
  className = "",
  showExpand = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isUserPausedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle Autoplay when page gets opened, and pause when page is turned away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      if (!isUserPausedRef.current) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .catch(() => {
              // If browser restricts unmuted autoplay, mute and try again
              video.muted = true;
              setIsMuted(true);
              video.play().catch(() => { });
            });
        }
      }
    } else {
      // Turned away from page: pause video and reset user paused flag
      video.pause();
      isUserPausedRef.current = false;
    }
  }, [isActive]);

  // Track progress
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  // Toggle Play / Pause
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      isUserPausedRef.current = false;
      video.play().catch(() => { });
    } else {
      isUserPausedRef.current = true;
      video.pause();
    }
  };

  // Toggle Mute / Unmute
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPhotoClick) {
      onPhotoClick(photo);
    }
  };

  return (
    <div
      onClick={handleTogglePlay}
      className={`group relative w-full h-full bg-white p-1 sm:p-2 rounded-page photo-card shadow-book overflow-hidden flex flex-col cursor-pointer select-none ${className}`}
    >
      {/* Video Viewport */}
      <div className="relative w-full h-full flex-1 min-h-0 bg-stone-950 rounded-xs overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={photo.src}
          playsInline
          loop
          preload="auto"
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Center Pause Indicator Overlay (Visible when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center transition-opacity">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-900/85 border border-cover-accent/50 text-cover-accent flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-transform">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-cover-accent" />
            </div>
          </div>
        )}

        {/* Top Control Bar (Expand + Mute) */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
          {/* Mute / Unmute Button */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            className="w-8 h-8 rounded-full bg-stone-900/80 backdrop-blur-xs text-white hover:text-cover-accent border border-stone-700/60 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-accent" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Fullscreen Expand Button */}
          {showExpand && onPhotoClick && (
            <button
              onClick={handleExpand}
              title="Expand Video"
              className="w-8 h-8 rounded-full bg-stone-900/80 backdrop-blur-xs text-white hover:text-cover-accent border border-stone-700/60 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Bottom Floating Scrubber Bar & Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 inset-x-0 p-2 bg-linear-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {/* Progress Line */}
          <div className="w-full h-1 bg-stone-700/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-cover-accent rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white text-[11px] font-mono px-1">
            <button
              onClick={handleTogglePlay}
              className="flex items-center gap-1 hover:text-cover-accent transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" />
                  <span>Play</span>
                </>
              )}
            </button>
            <span className="text-stone-300 text-[10px]">Tap video to play/pause</span>
          </div>
        </div>
      </div>
    </div>
  );
};

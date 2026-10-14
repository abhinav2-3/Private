"use client";

import React from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { siteConfig } from "@/config/site";

interface MusicBarProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  className?: string;
}

export const MusicBar: React.FC<MusicBarProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-stone-800 shadow-md text-stone-200 select-none ${className}`}
    >
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        title={isPlaying ? "Pause Music" : "Play Music"}
        className="p-1 rounded-full hover:bg-stone-800 text-cover-accent transition-colors cursor-pointer"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5" />
        ) : (
          <Play className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Track Title & Animated Equalizer */}
      <div className="flex items-center gap-2 px-1 max-w-[130px] sm:max-w-[180px]">
        <Music className="w-3 h-3 text-cover-accent shrink-0" />
        <span className="font-body text-xs text-stone-300 truncate font-medium">
          {siteConfig.music.title}
        </span>

        {/* Animated dancing sound wave bars */}
        {isPlaying && !isMuted ? (
          <div className="flex items-end gap-0.5 h-3 shrink-0">
            <span className="w-0.5 bg-cover-accent rounded-full animate-bounce h-2" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 bg-cover-accent rounded-full animate-bounce h-3" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 bg-cover-accent rounded-full animate-bounce h-1.5" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          <div className="flex items-end gap-0.5 h-3 shrink-0 opacity-40">
            <span className="w-0.5 bg-stone-500 rounded-full h-1" />
            <span className="w-0.5 bg-stone-500 rounded-full h-1.5" />
            <span className="w-0.5 bg-stone-500 rounded-full h-1" />
          </div>
        )}
      </div>

      {/* Mute/Unmute Toggle Button */}
      <button
        onClick={onToggleMute}
        title={isMuted ? "Unmute" : "Mute"}
        className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-accent" />
        ) : (
          <Volume2 className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
};

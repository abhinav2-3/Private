"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";

interface MusicPlayerOptions {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  volume?: number;
}

export interface MusicPlayerHandle {
  isPlaying: boolean;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
}

export function useMusicPlayer({
  src,
  autoplay = false,
  loop = true,
  volume = 0.5,
}: MusicPlayerOptions): MusicPlayerHandle {
  const soundRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const sound = new Howl({
      src: [src],
      loop,
      volume,
      html5: true, // Use HTML5 Audio to stream larger files smoothly
      onloaderror: (_id, err) => {
        console.warn("Audio load warning:", err);
      },
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => {
        if (!loop) setIsPlaying(false);
      },
    });

    soundRef.current = sound;

    if (autoplay) {
      sound.play();
    }

    return () => {
      sound.stop();
      sound.unload();
    };
  }, [src, loop, volume, autoplay]);

  const play = useCallback(() => {
    if (soundRef.current) {
      if (!soundRef.current.playing()) {
        soundRef.current.play();
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (soundRef.current) {
      if (soundRef.current.playing()) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (soundRef.current) {
      const nextMuted = !isMuted;
      soundRef.current.mute(nextMuted);
      setIsMuted(nextMuted);
    }
  }, [isMuted]);

  const setSoundVolume = useCallback((val: number) => {
    if (soundRef.current) {
      soundRef.current.volume(Math.max(0, Math.min(1, val)));
    }
  }, []);

  return {
    isPlaying,
    isMuted,
    play,
    pause,
    togglePlay,
    toggleMute,
    setVolume: setSoundVolume,
  };
}

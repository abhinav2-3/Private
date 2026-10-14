"use client";

import React, { forwardRef } from "react";

interface BookPageProps {
  children: React.ReactNode;
  className?: string;
  isHardCover?: boolean;
}

export const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  ({ children, className = "", isHardCover = false }, ref) => {
    return (
      <div
        ref={ref}
        data-density={isHardCover ? "hard" : "soft"}
        className={`w-full h-full relative overflow-hidden select-none bg-paper ${
          isHardCover ? "shadow-book" : "shadow-sm"
        } ${className}`}
      >
        {children}
      </div>
    );
  }
);

BookPage.displayName = "BookPage";

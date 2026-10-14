"use client";

import React, { useState } from "react";
import { SAMPLE_SPREADS } from "@/data/pages";
import { TEMPLATE_LAYOUTS } from "@/config/layouts";
import { PhotoItem, TemplateName } from "@/types";
import { SpreadCanvas } from "@/components/SpreadCanvas";

export default function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>("single-spotlight");
  const [viewMode, setViewMode] = useState<"full" | "left" | "right" | "split">("full");
  const [activeModalPhoto, setActiveModalPhoto] = useState<PhotoItem | null>(null);

  // Find the sample spread matching the selected template
  const currentSpread =
    SAMPLE_SPREADS.find((s) => s.template === selectedTemplate) || SAMPLE_SPREADS[1];
  const templateInfo = TEMPLATE_LAYOUTS[selectedTemplate];

  const templatesList: TemplateName[] = [
    "cover",
    "single-spotlight",
    "duo-classic",
    "trio-story",
    "quad-grid",
    "five-collage",
    "six-scrapbook",
    "panoramic-spread",
    "polaroid-scatter",
    "memory-timeline",
    "letter-and-moments",
    "back-cover",
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8">
      {/* Top Header & Phase 3 Status */}
      <header className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-cover-accent">
              Phase 3: Page Renderer Verification
            </span>
          </div>
          <h1 className="font-title text-2xl sm:text-3xl font-bold text-cover-accent">
            {templateInfo.title}
          </h1>
          <p className="font-body text-xs sm:text-sm text-stone-400 mt-0.5">
            {templateInfo.description}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-stone-900/90 border border-stone-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => setViewMode("full")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              viewMode === "full"
                ? "bg-accent text-white shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Full Spread
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              viewMode === "split"
                ? "bg-accent text-white shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Split (Left + Right)
          </button>
          <button
            onClick={() => setViewMode("left")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              viewMode === "left"
                ? "bg-accent text-white shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Left Page
          </button>
          <button
            onClick={() => setViewMode("right")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              viewMode === "right"
                ? "bg-accent text-white shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Right Page
          </button>
        </div>
      </header>

      {/* Main Canvas Display Area */}
      <section className="w-full max-w-6xl flex flex-col items-center justify-center my-auto py-2">
        {viewMode === "full" && (
          <div className="w-full max-w-4xl shadow-book rounded-page overflow-hidden">
            <SpreadCanvas
              spread={currentSpread}
              side="full"
              onPhotoClick={setActiveModalPhoto}
            />
          </div>
        )}

        {viewMode === "split" && (
          <div className="w-full max-w-4xl flex items-center justify-center shadow-book rounded-page overflow-hidden">
            <div className="w-1/2 aspect-square">
              <SpreadCanvas
                spread={currentSpread}
                side="left"
                pageNumber={currentSpread.spreadIndex * 2}
                onPhotoClick={setActiveModalPhoto}
              />
            </div>
            <div className="w-1/2 aspect-square">
              <SpreadCanvas
                spread={currentSpread}
                side="right"
                pageNumber={currentSpread.spreadIndex * 2 + 1}
                onPhotoClick={setActiveModalPhoto}
              />
            </div>
          </div>
        )}

        {viewMode === "left" && (
          <div className="w-full max-w-md aspect-square shadow-book rounded-page overflow-hidden">
            <SpreadCanvas
              spread={currentSpread}
              side="left"
              pageNumber={currentSpread.spreadIndex * 2}
              onPhotoClick={setActiveModalPhoto}
            />
          </div>
        )}

        {viewMode === "right" && (
          <div className="w-full max-w-md aspect-square shadow-book rounded-page overflow-hidden">
            <SpreadCanvas
              spread={currentSpread}
              side="right"
              pageNumber={currentSpread.spreadIndex * 2 + 1}
              onPhotoClick={setActiveModalPhoto}
            />
          </div>
        )}
      </section>

      {/* Template Selector Carousel */}
      <footer className="w-full max-w-6xl mt-8">
        <div className="text-center mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
            Select Template ({templatesList.indexOf(selectedTemplate) + 1} of {templatesList.length})
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-stone-800">
          {templatesList.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl;
            const info = TEMPLATE_LAYOUTS[tmpl];
            return (
              <button
                key={tmpl}
                onClick={() => setSelectedTemplate(tmpl)}
                className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all text-left flex flex-col gap-0.5 ${
                  isSelected
                    ? "bg-stone-800 border-cover-accent text-white shadow-md scale-105"
                    : "bg-stone-950/80 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700"
                }`}
              >
                <span className="font-semibold">{info.title}</span>
                <span className="text-[10px] opacity-60 truncate max-w-[120px]">
                  {tmpl}
                </span>
              </button>
            );
          })}
        </div>
      </footer>

      {/* Photo Preview Modal */}
      {activeModalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="bg-paper text-ink p-4 sm:p-6 rounded-page shadow-book max-w-xl w-full relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalPhoto(null)}
              className="absolute top-3 right-3 text-ink-muted hover:text-ink text-xl font-bold w-8 h-8 rounded-full bg-stone-200/60 flex items-center justify-center"
            >
              ×
            </button>
            <div className="relative w-full aspect-4/3 rounded-xs overflow-hidden shadow-photo bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalPhoto.src}
                alt={activeModalPhoto.alt}
                className="w-full h-full object-cover"
              />
            </div>
            {activeModalPhoto.caption && (
              <p className="font-hand text-2xl text-accent mt-4 text-center">
                {activeModalPhoto.caption}
              </p>
            )}
            {activeModalPhoto.location && (
              <p className="font-mono text-xs text-ink-muted mt-1 uppercase tracking-wider">
                📍 {activeModalPhoto.location} {activeModalPhoto.date ? `• ${activeModalPhoto.date}` : ""}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

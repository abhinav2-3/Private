export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
      {/* Theme Verification Container */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        {/* Leather Cover Preview Badge */}
        <div className="w-full bg-cover border border-cover-accent/30 rounded-cover p-8 shadow-book flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-2 border border-cover-accent/20 rounded-cover pointer-events-none" />
          <span className="text-xs uppercase tracking-widest text-cover-accent/70 font-body mb-2">
            The Keepsake Collection
          </span>
          <h1 className="font-title text-3xl sm:text-4xl text-cover-accent font-bold tracking-tight">
            Birthday Photo Album
          </h1>
          <p className="font-hand text-xl sm:text-2xl text-accent mt-3">
            Handcrafted with timeless memories & love
          </p>
        </div>

        {/* Paper Page Preview Card */}
        <div className="w-full paper-surface rounded-page p-8 sm:p-10 shadow-photo border border-paper-edge relative text-ink">
          {/* Decorative Tape */}
          <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 rounded-sm rotate-[-1.5deg]" />

          <div className="flex flex-col gap-4">
            <h2 className="font-title text-2xl font-bold text-ink">
              Phase 1: Theme System Active
            </h2>
            <p className="font-body text-ink-muted leading-relaxed">
              All tokens are unified in <code className="text-accent font-mono text-sm bg-accent-soft px-1.5 py-0.5 rounded">app/theme.css</code> and mapped to Tailwind utilities:
            </p>

            {/* Token Swatches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2 text-xs font-medium">
              <div className="p-3 rounded bg-cover text-cover-accent flex flex-col gap-1 items-center justify-center text-center shadow-sm">
                <span>--color-cover</span>
                <span className="opacity-70 text-[10px]">#261B17</span>
              </div>
              <div className="p-3 rounded bg-paper text-ink border border-paper-edge flex flex-col gap-1 items-center justify-center text-center shadow-sm">
                <span>--color-paper</span>
                <span className="opacity-70 text-[10px]">#FAF6EE</span>
              </div>
              <div className="p-3 rounded bg-accent text-paper flex flex-col gap-1 items-center justify-center text-center shadow-sm">
                <span>--color-accent</span>
                <span className="opacity-70 text-[10px]">#C8644E</span>
              </div>
              <div className="p-3 rounded bg-tape text-ink border border-tape-border flex flex-col gap-1 items-center justify-center text-center shadow-sm">
                <span>--color-tape</span>
                <span className="opacity-70 text-[10px]">Washi Paper</span>
              </div>
            </div>

            {/* Typography Preview */}
            <div className="border-t border-paper-edge pt-4 flex flex-col gap-2">
              <p className="font-title text-lg font-semibold text-ink">
                Title Font: Playfair Display (Serif Elegance)
              </p>
              <p className="font-body text-sm text-ink-muted">
                Body Font: Plus Jakarta Sans (Clean, Modern, Legible)
              </p>
              <p className="font-hand text-2xl text-accent">
                Handwritten Font: Caveat (Personal handwritten notes & stickers)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

type HeaderProps = {
  source?: "api" | "cache";
  onOpenDrawer?: () => void;
  onToggleTheme?: () => void;
};

function Header({ source, onOpenDrawer, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600" />
          <span className="font-semibold tracking-tight">ActorHub</span>
          {source && (
            <span
              className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                source === "cache"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
              }`}
            >
              source: {source}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDrawer}
            className="md:hidden inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
          >
            Browse actors
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                 viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1-9.45-9.45A1 1 0 0 0 12 2a10 10 0 1 0 10 10 1 1 0 0 0-.36-.77z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;

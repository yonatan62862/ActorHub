type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
  retryLabel = "Retry",
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`p-4 flex items-start gap-3 text-sm ${className}`} role="alert">
      <div className="mt-0.5 text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 7h2v6h-2zm0 8h2v2h-2z"/><path d="M1 21h22L12 2 1 21z"/>
        </svg>
      </div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-slate-600 dark:text-slate-300">{message}</div>
        {onRetry && (
          <div className="mt-2">
            <button
              onClick={onRetry}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {retryLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ErrorState;
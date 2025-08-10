
type LoadingProps = {
  rows?: number;
  className?: string;
};

export default function Loading({ rows = 3, className = "" }: LoadingProps) {
  return (
    <div className={`p-4 space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
      ))}
    </div>
  );
}

type SpinnerProps = { size?: number; className?: string };

export function Spinner({ size = 16, className = "" }: SpinnerProps) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-slate-400/70 border-t-transparent animate-spin ${className}`}
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    />
  );
}

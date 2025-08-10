import { useMemo, useState } from "react";
import { useActorIds } from "../hooks/useCast";
import Loading from "./Loading";
import ErrorState from "./ErrorState";

type CastListProps = {
  selectedId?: number;
  onSelect: (id: number) => void;
};


function CastList({ selectedId, onSelect }: CastListProps) {
  const { data: ids, isLoading, isError, refetch, isFetching } = useActorIds();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!ids) return [];
    if (!q.trim()) return ids;
    return ids.filter((id) => id.toString().includes(q.trim()));
  }, [ids, q]);

  if (isLoading) return <Loading rows={6} />;
  if (isError) return <ErrorState message="Failed to load IDs" onRetry={() => refetch()} />;

  return (
    <div className="p-3">
      <div className="mb-3">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search id…"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
          />
          {isFetching && (
            <div className="absolute right-2 top-2.5 h-4 w-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
          )}
        </div>
      </div>

      <ul className="max-h-[calc(100vh-200px)] overflow-y-auto pr-1 space-y-2">
        {filtered.map((id) => {
          const active = selectedId === id;
          return (
            <li key={id}>
              <button
                onClick={() => onSelect(id)}
                className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition
                  ${active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                Actor #{id}
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="text-xs text-slate-500 px-1 py-2">No matches</li>
        )}
      </ul>
    </div>
  );
}
export default CastList;
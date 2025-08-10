import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CastList from "../components/CastList";
import ActorCard from "../components/ActorCard";
import CommentForm from "../components/CommentForm";

function Home() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const initialId = id ? Number(id) : undefined;
  const [selectedId, setSelectedId] = useState<number | undefined>(initialId);

  useEffect(() => {
    setSelectedId(initialId);
  }, [initialId]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-12 gap-6">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:block md:col-span-4 lg:col-span-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm">
          <div className="px-4 py-3 text-sm font-medium border-b border-slate-200/70 dark:border-slate-800">
            Actor IDs
          </div>
          <CastList
            selectedId={selectedId}
            onSelect={(newId) => {
              setSelectedId(newId);
              navigate(`/actor/${newId}`);
            }}
          />
        </div>
      </aside>

      {/* Content */}
      <section className="md:col-span-8 lg:col-span-9 space-y-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm">
          <ActorCard id={selectedId} />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm">
          <CommentForm actorId={selectedId} />
        </div>
      </section>
    </main>
  );
}
export default Home;

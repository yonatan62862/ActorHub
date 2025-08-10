import { useActor, useDeleteActorFromCache } from "../hooks/useCast";
import Loading from "./Loading";
import ErrorState from "./ErrorState";

type ActorCardProps = { id?: number };

function ActorCard({ id }: ActorCardProps) {
  const { data: actor, isLoading, isError } = useActor(id);
  const del = useDeleteActorFromCache();

  if (!id) {
    return (
      <div className="p-8 text-center text-slate-500">
        Select an actor from the list
      </div>
    );
  }

  if (isLoading) return <Loading rows={8} />;
  if (isError || !actor) return <ErrorState message="Failed to load actor" />;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {actor.image && (
          <img
            src={actor.image}
            alt={actor.name}
            className="w-32 h-40 rounded-xl object-cover shadow-sm"
          />
        )}

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{actor.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2">
              <div className="text-slate-500">Birthday</div>
              <div>{actor.birthday ?? "—"}</div>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2">
              <div className="text-slate-500">Gender</div>
              <div>{actor.gender ?? "—"}</div>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2">
              <div className="text-slate-500">Country</div>
              <div>{actor.country ?? "—"}</div>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2">
              <div className="text-slate-500">Character</div>
              <div>{actor.character?.name ?? "—"}</div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => id && del.mutate(id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-60"
              disabled={del.isPending}
            >
              {del.isPending ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
                  Removing…
                </>
              ) : (
                <>Remove from cache</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ActorCard;

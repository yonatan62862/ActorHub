import cache, { keys } from "../cache/cache";

const deleteActorFromCache = (actorId: number): boolean => {
  const cast = cache.get<Array<{ id: number }>>(keys.cast);
  if (!cast) return false;

  const next = cast.filter(a => a.id !== actorId);
  if (next.length === cast.length) return false;

  cache.set(keys.cast, next);
  return true;
};

export { deleteActorFromCache };

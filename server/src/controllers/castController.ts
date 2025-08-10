import { getCastData, getActorIds, getActorById } from "../services/castService";
import { ok, fail } from "../utils/http";

const listCast = async (_req: any, res: any) => {
  const { data, source } = await getCastData();
  return ok(res, { source, data });
};

const getActor = async (req: any, res: any) => {
  const id = req.numericId as number;
  const actor = await getActorById(id);
  if (!actor) return fail(res, 404, "Actor not found");
  return ok(res, { actor });
};

const listActorIds = async (_req: any, res: any) => {
  const ids = await getActorIds();
  return ok(res, { ids });
};

export { listCast, getActor, listActorIds };

import { Request, Response } from "express";
import { deleteActorFromCache } from "../services/cacheService";

const removeActorFromCache = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid actor id" });
  }

  const removed = deleteActorFromCache(id);
  if (!removed) {
    return res.status(404).json({ success: false, message: "Actor not found in cache" });
  }

  return res.json({ success: true, message: `Actor ${id} removed from cache` });
};

export { removeActorFromCache };

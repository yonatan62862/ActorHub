import { Router } from "express";
import { removeActorFromCache } from "../controllers/cacheController";

const router = Router();

router.delete("/cast/:id/cache", removeActorFromCache);

export default router;

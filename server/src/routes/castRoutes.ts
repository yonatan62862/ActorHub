import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { parseNumericId } from "../middlewares/parseId";
import { listCast, getActor, listActorIds } from "../controllers/castController";


const router = Router();

router.get("/cast", asyncHandler(listCast));
router.get("/actors/ids", asyncHandler(listActorIds));

router.get("/cast/:id", parseNumericId(), asyncHandler(getActor));

export default router;


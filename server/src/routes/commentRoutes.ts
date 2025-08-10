import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { parseNumericId } from "../middlewares/parseId";
import { addActorComment, listComments } from "../controllers/commentController";

const router = Router();

router.post("/cast/:id/comment", parseNumericId(), asyncHandler(addActorComment));
router.get("/comments", asyncHandler(listComments));

export default router;

import { addComment, getAllComments } from "../services/commentService";
import { ok, fail } from "../utils/http";

const addActorComment = async (req: any, res: any) => {
  const id = req.numericId as number;
  const { comment } = req.body;
  if (typeof comment !== "string" || comment.trim() === "") {
    return fail(res, 400, "Invalid comment");
  }
  const record = await addComment(id, comment.trim());
  return ok(res, { record });
};

const listComments = async (_req: any, res: any) => {
  const comments = await getAllComments();
  return ok(res, { comments });
};

export { addActorComment, listComments };
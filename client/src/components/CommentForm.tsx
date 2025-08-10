import { useMemo, useState } from "react";
import { useComments, useAddComment } from "../hooks/useComments";
import Loading, { Spinner } from "./Loading";
import ErrorState from "./ErrorState";

type CommentFormProps = { actorId?: number };

function CommentForm({ actorId }: CommentFormProps) {
  const { data: comments, isLoading, isError, refetch, isFetching } = useComments();
  const add = useAddComment();
  const [text, setText] = useState("");

  const actorComments = useMemo(
    () => (comments ?? []).filter((c) => c.id === actorId),
    [comments, actorId]
  );

  if (!actorId) return null;

  if (isLoading) return <Loading rows={3} className="p-6" />;

  if (isError) {
    return (
      <ErrorState
        message="Failed to load comments"
        onRetry={() => refetch()}
        className="p-6"
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold tracking-tight">Comments</h3>
        {isFetching && <Spinner className="h-4 w-4" />}
      </div>

      {actorComments.length === 0 ? (
        <div className="text-slate-500">No comments yet.</div>
      ) : (
        <ul className="space-y-2 mb-4">
          {actorComments.map((c, i) => (
            <li key={`${c.comment}-${i}`} className="group flex items-center justify-between">
              <span className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                {c.comment}
              </span>
            </li>
          ))}
        </ul>
      )}

      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const value = text.trim();
          if (!value || !actorId) return;
          add.mutate({ id: actorId, comment: value }, { onSuccess: () => setText("") });
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment…"
          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
          aria-label="New comment"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          disabled={add.isPending || !text.trim()}
        >
          {add.isPending && <Spinner />}
          {add.isPending ? "Saving…" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { CommentsResponse } from "../types";

function useComments() {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data } = await api.get<CommentsResponse>("/comments");
      return data.comments; 
    },
  });
}

function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: { id: number; comment: string }) => {
      await api.post(`/cast/${args.id}/comment`, { comment: args.comment });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}

export { useComments, useAddComment };

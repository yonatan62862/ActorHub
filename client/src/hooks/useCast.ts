import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Actor, CastListResponse, ActorResponse, IdsResponse } from "../types";

function useActorIds() {
    return useQuery({
        queryKey: ["actorIds"],
        queryFn: async () => {
            const { data } = await api.get<IdsResponse>("/actors/ids");
            return data.ids;
        },
    });
}

function useActor(id?: number) {
    return useQuery({
        queryKey: ["actor", id],
        enabled: typeof id === "number",
        queryFn: async () => {
            const { data } = await api.get<ActorResponse>(`/cast/${id}`);
            return data.actor as Actor;
        },
    });
}
function useDeleteActorFromCache() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/cast/${id}/cache`);
        },
        onSuccess: (_data, id) => {
            qc.invalidateQueries({ queryKey: ["actorIds"] });
            qc.invalidateQueries({ queryKey: ["actor", id] });
            qc.invalidateQueries({ queryKey: ["castList"] });
        },
    });
}

function useCastList() {
    return useQuery({
        queryKey: ["castList"],
        queryFn: async () => {
            const { data } = await api.get<CastListResponse>("/cast");
            return data;
        },
    });
}
export { useActorIds, useActor, useDeleteActorFromCache, useCastList };

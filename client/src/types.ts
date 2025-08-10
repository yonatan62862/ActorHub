export type Actor = {
  id: number;
  name: string;
  birthday: string | null;
  gender: string | null;
  country?: string | null;
  image?: string | null;
  character: { id: number; name: string; image?: string | null };
};

export type CastListResponse = {
  success: boolean;
  source: "api" | "cache";
  data: Actor[];
};

export type ActorResponse = {
  success: boolean;
  actor: Actor;
};

export type IdsResponse = {
  success: boolean;
  ids: number[];
};

export type CommentsResponse = {
  success: boolean;
  comments: { id: number; comment: string }[];
};

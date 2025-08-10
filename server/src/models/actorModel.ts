export interface Actor {
  id: number;
  name: string;
  birthday: string | null;
  gender: string | null;
  country?: string | null;
  image?: string | null;
  character: { id: number; name: string; image?: string | null };
}
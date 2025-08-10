import axios from 'axios';
import cache from '../cache/cache';
import { Actor } from '../models/actorModel';

const CACHE_KEY = 'cast';

const getCastData = async (): Promise<{ data: Actor[]; source: 'api' | 'cache' }> => {
  const cached = cache.get<Actor[]>(CACHE_KEY);
  if (cached) return { data: cached, source: 'cache' };
  console.log(">>> Fetching from API");

  const resp = await axios.get('https://api.tvmaze.com/shows/1/cast', {
    timeout: 10_000,
  });

  const data: Actor[] = resp.data.map((item: any) => ({
    id: item.person.id,
    name: item.person.name,
    birthday: item.person.birthday,
    gender: item.person.gender,
    country: item.person.country?.name ?? null,
    image: item.person.image?.medium ?? null,
    character: {
      id: item.character.id,
      name: item.character.name,
      image: item.character.image?.medium ?? null,
    },
  }));

  cache.set(CACHE_KEY, data);
  return { data, source: 'api' };
};

const getCachedCast = () => cache.get<Actor[]>(CACHE_KEY);
const setCachedCast = (actors: Actor[]) => cache.set(CACHE_KEY, actors);

const getActorIds = async (): Promise<number[]> => {
  const { data } = await getCastData();
  return data.map(a => a.id);
};

const getActorById = async (id: number): Promise<Actor | undefined> => {
  const cached = getCachedCast();
  if (cached) return cached.find(a => a.id === id);

  const { data } = await getCastData();
  return data.find(a => a.id === id);
};

export { getCastData, getCachedCast, setCachedCast, getActorIds, getActorById };
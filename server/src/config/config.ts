import dotenv from 'dotenv';
dotenv.config();

function toInt(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default {
  port: toInt(process.env.PORT, 3000),
  cacheTtlSeconds: toInt(process.env.CACHE_TTL_SECONDS, 300),
  prewarmCache: process.env.PREWARM_CACHE === 'true' // set in .env
};

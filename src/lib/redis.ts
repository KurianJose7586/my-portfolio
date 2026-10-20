import { Redis } from "@upstash/redis";

// No throw on missing env: the build must not depend on runtime secrets.
// Without credentials the client only warns, presence routes fail at request time,
// and the client-side presenceFetch backs off.
// KV_* is what Vercel's Upstash integration injects; UPSTASH_* is what an Upstash-console DB uses.
// KV_* wins so a stale UPSTASH_* pair can't shadow the integration.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
});

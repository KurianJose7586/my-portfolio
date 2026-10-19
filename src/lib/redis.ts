import { Redis } from "@upstash/redis";

// No throw on missing env: the build must not depend on runtime secrets.
// Without UPSTASH_REDIS_REST_URL/TOKEN the client only warns, presence routes
// fail at request time, and the client-side presenceFetch backs off.
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

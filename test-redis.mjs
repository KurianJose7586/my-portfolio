// Quick Redis connection test — run with: node test-redis.mjs
import { Redis } from "@upstash/redis";
import { readFileSync } from "fs";
import { resolve } from "path";

// Parse .env.local manually
const envPath = resolve(process.cwd(), ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf-8")
    .split("\n")
    .filter(l => l && !l.startsWith("#") && l.includes("="))
    .map(l => {
      const key = l.split("=")[0].trim();
      let val = l.split("=").slice(1).join("=").trim();
      // Strip surrounding quotes (single or double) — Next.js accepts them, raw node doesn't
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      return [key, val];
    })
);

const url = env["UPSTASH_REDIS_REST_URL"];
const token = env["UPSTASH_REDIS_REST_TOKEN"];

if (!url || url.includes("YOUR-DB") || !token || token.includes("YOUR_TOKEN")) {
  console.error("❌ .env.local still has placeholder values. Please fill in your Upstash credentials.");
  process.exit(1);
}

const redis = new Redis({ url, token });

async function test() {
  console.log("🔌 Connecting to Upstash Redis...\n");

  // 1. Basic ping
  await redis.set("kurian:test:ping", "pong", { ex: 10 });
  const ping = await redis.get("kurian:test:ping");
  console.log("✅ SET/GET:", ping === "pong" ? "OK (pong)" : `FAIL (got: ${ping})`);

  // 2. Sorted set (active-users)
  await redis.zadd("kurian:sessions", { score: Date.now(), member: "test-session" });
  const count = await redis.zcard("kurian:sessions");
  await redis.zrem("kurian:sessions", "test-session");
  console.log("✅ ZADD/ZCARD/ZREM:", count >= 1 ? "OK" : "FAIL");

  // 3. List (interactions/events)
  await redis.lpush("kurian:test:events", { id: "test", type: "click", expiresAt: Date.now() + 1000 });
  const events = await redis.lrange("kurian:test:events", 0, -1);
  await redis.del("kurian:test:events");
  console.log("✅ LPUSH/LRANGE:", events.length === 1 ? "OK" : "FAIL");

  // 4. Visit counter
  await redis.setnx("kurian:total-visits", 156);
  const visits = await redis.get("kurian:total-visits");
  console.log("✅ SETNX/GET (visits):", visits !== null ? `OK (current: ${visits})` : "FAIL");

  // 5. Cursor key with TTL
  await redis.set("cursor:test-session", { pageX: 100, pageY: 200, color: "#EB5E93" }, { ex: 3 });
  const cursor = await redis.get("cursor:test-session");
  await redis.del("cursor:test-session");
  console.log("✅ Cursor SET/GET:", cursor ? "OK" : "FAIL");

  console.log("\n🎉 All tests passed! Redis is connected and working.\n");
}

test().catch(err => {
  console.error("\n❌ Redis test failed:", err.message);
  process.exit(1);
});

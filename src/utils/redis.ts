// import { Redis } from "ioredis";
// require("dotenv").config();

// const redisClint = () => {
//   if (process.env.REDIS_URL) {
//     console.log("Redis is Connected");
//     return process.env.REDIS_URL;
//   }
//   throw new Error("Redis Connection failed");
// };

// export const redis = new Redis(redisClint());

import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://light-ram-57791.upstash.io",
  token: "AeG_AAIjcDFmNmJjYjVlMzIyNjQ0ZjczOThlZDQ2ZjYwODFhZTQ0N3AxMA",
});

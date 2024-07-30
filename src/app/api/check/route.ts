import connectDB from "@/utils/db";
import { redis } from "@/utils/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // if (req.method === "GET") {
  //   // Fetch a value from Redis
  //   const value = await redis.get("key");
  //   return new NextResponse(value, { status: 200 });
  // } else
  if (req.method === "POST") {
    // Set a value in Redis
    const { key, value } = await req.json();
    const data = await redis.get(key);
    return new NextResponse(
      JSON.stringify({
        success: true,
        user: data,
        message: "succesfully",
      }),
      { status: 201 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Unsuccessful request",
      }),
      { status: 400 }
    );
  }
}

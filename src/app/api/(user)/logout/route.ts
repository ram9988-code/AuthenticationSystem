import { isAuthenticated } from "@/middleware/isAuthenticated";
import { redis } from "@/utils/redis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user: any = await isAuthenticated();
    cookies().set("access_token", "", { maxAge: 1 });
    cookies().set("refresh_token", "", { maxAge: 1 });

    redis.del(user._id);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Logged out succesfully",
      }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

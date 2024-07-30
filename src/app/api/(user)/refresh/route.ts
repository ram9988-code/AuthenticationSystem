import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { redis } from "@/utils/redis";
import { accessTokenOption, refreshTokenOption } from "@/utils/jwt";

export async function GET(req: Request) {
  try {
    const refresh_token = cookies().get("refresh_token");

    if (!refresh_token) {
      return new NextResponse("Please login to this resource", { status: 400 });
    }

    const decoded = jwt.verify(
      refresh_token?.value,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;

    const message = "Could not refresh token";
    if (!decoded) {
      return new NextResponse(message, { status: 400 });
    }

    const user: any = await redis.get(JSON.stringify(decoded.id));
    if (!user) {
      return new NextResponse("Please login to access this resourse", {
        status: 400,
      });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN as string,
      {
        expiresIn: "5m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: "7d" }
    );

    cookies().set("access_token", accessToken, accessTokenOption);
    cookies().set("refresh_token", refreshToken, refreshTokenOption);
    await redis.set(user._id, JSON.stringify(user), { ex: 604800 });

    return new NextResponse(
      JSON.stringify({ stutus: "Success", accessToken }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

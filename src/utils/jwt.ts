import "dotenv/config";
import { redis } from "./redis";
import { IUser } from "@/model/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);

export const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

//options for cookies
export const accessTokenOption: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 10000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOption: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (user: IUser, statusCode: number) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  //upload session to redis
  //console.log(JSON.stringify(user._id));
  redis.set(user.id, JSON.stringify(user), { ex: 604800 });

  if (process.env.NODE_ENV === "production") {
    accessTokenOption.secure = true;
  }

  cookies().set("access_token", accessToken, accessTokenOption);
  cookies().set("refresh_token", refreshToken, refreshTokenOption);

  return new NextResponse(
    JSON.stringify({
      success: true,
      user,
      accessToken,
    }),
    { status: statusCode }
  );
};

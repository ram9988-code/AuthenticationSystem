import User, { IUser } from "@/model/user";
import connectDB from "@/utils/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { activationCode, activationToken } = await req.json();
    await connectDB();

    const newUser: { user: IUser; activationCode: string } = jwt.verify(
      activationToken,
      process.env.ACTIVATION_SECRET as string
    ) as { user: IUser; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      return new NextResponse("Invalid activation code!", { status: 400 });
    }

    const { email, password, name } = newUser.user;

    const user = await User.create({
      name,
      email,
      password,
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

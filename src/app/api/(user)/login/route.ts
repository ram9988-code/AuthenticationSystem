import User from "@/model/user";
import { sendToken } from "@/utils/jwt";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    if (!email || !password) {
      return new NextResponse("Please enter email and password", {
        status: 400,
      });
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return new NextResponse("Invalid email and password", { status: 400 });
    }
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return new NextResponse("Invalid email and password", { status: 400 });
    }
    sendToken(user, 200);
    return new NextResponse(
      JSON.stringify({ message: "Login successful", user }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

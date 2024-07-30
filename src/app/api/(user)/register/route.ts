import User from "@/model/user";
import ErrorHandler from "@/utils/ErrorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "@/utils/sendMail";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();

    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) {
      return new NextResponse("Email already exist", { status: 400 });
    }

    const user: IRegistrationBody = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        templete: "activation.mail.ejs",
        data,
      });

      return new NextResponse(
        JSON.stringify({
          success: true,
          message: `Please check your email: ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse(error.message, { status: 400 });
    }
  } catch (error: any) {
    return new NextResponse("Error in creating user" + error.message, {
      status: 500,
    });
  }
}

const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};

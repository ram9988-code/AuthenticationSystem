import { getUserById } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const id = await req.json();
    const user = getUserById(id);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

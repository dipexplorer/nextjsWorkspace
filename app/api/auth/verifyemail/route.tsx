import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json();
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";

await connectDB;

export async function GET(request: NextRequest) {
  try {
    const curUserId = await getDataFromToken(request);
    const curUser = await User.findById(curUserId).select("-password");
    return NextResponse.json({
      message: "Current user fetched successfully",
      user: curUser,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

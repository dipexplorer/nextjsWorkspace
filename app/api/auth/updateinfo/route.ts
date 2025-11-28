import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NestedMiddlewareError } from "next/dist/build/utils";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    // Read auth token → extract userId
    const userId = await getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, email } = await req.json();

    // Validation
    if (!username || !email) {
      return NextResponse.json(
        { error: "Username & email are required" },
        { status: 400 }
      );
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: {
          username: updatedUser.username,
          email: updatedUser.email,
          _id: updatedUser._id,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

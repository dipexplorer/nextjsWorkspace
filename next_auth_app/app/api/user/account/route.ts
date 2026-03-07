import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const user_id = await getDataFromToken(request);
        const user = await User.findById(user_id).select("-password");
        return NextResponse.json({
            message: "User fetched successfully",
            user,
        });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

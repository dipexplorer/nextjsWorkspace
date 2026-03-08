import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({
            verifyEmailToken: token,
            verifyEmailExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or Expired Token" },
                { status: 400 },
            );
        }

        console.log(user);

        user.verifyEmailToken = null;
        user.verifyEmailExpiry = null;
        user.isVerified = true;
        await user.save();

        return NextResponse.json(
            {
                message: "Email Verified Successfully",
                success: true,
            },
            { status: 200 },
        );
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

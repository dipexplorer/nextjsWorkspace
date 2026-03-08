import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { connectReactDebugChannel } from "next/dist/server/dev/debug-channel";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 400 },
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpiry = null;

        await user.save();

        return NextResponse.json(
            { message: "Password reset successfully", success: true },
            { status: 200 },
        );
    } catch (err: any) {
        return NextResponse.json(
            {
                message: err.message,
            },
            {
                status: 500,
            },
        );
    }
}

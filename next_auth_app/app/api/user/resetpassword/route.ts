import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/noidemailer";
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 },
            );
        }
        const user_email = user.email;

        await sendEmail({
            email: user_email,
            emailType: "RESET",
            userId: user._id,
        });

        return NextResponse.json(
            { message: "Email sent successfully" },
            {
                status: 200,
            },
        );
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

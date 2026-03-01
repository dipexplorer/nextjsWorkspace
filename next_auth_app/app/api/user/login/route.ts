import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { msg: "Please fill all fields" },
                { status: 400 },
            );
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json(
                { msg: "User does not exists" },
                { status: 400 },
            );
        }

        const validPassword = await bcrypt.compare(
            password,
            existingUser.password,
        );
        if (!validPassword) {
            return NextResponse.json(
                { msg: "Invalid password" },
                { status: 400 },
            );
        }

        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1h",
        });

        const response = NextResponse.json({
            msg: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (err: any) {
        return NextResponse.json({ msg: err.message }, { status: 500 });
    }
}

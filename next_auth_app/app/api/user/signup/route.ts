import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json(
                { msg: "Please fill all fields" },
                { status: 400 },
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { msg: "User already exists" },
                { status: 400 },
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // const user = await User.create({ username, email, password: hashedPassword });

        return NextResponse.json(
            {
                msg: "User created successfully",
                success: true,
                user: savedUser,
            },
            { status: 201 },
        );
    } catch (err: any) {
        return NextResponse.json({ msg: err.message }, { status: 500 });
    }
}

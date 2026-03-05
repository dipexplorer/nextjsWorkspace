import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
            },
            { status: 200 },
        );

        response.cookies.set("token", "", {
            httpOnly: true,
        });

        return response;
    } catch (err: any) {
        console.log(err);
        return NextResponse.json(
            {
                error: err.message,
            },
            { status: 500 },
        );
    }
}

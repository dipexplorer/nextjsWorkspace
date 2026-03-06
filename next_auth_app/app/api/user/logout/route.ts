import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // hum response bana raha he taki session cokkies ko remove kar sake
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            },
            { status: 200 },
        );

        response.cookies.set("token", "", {
            httpOnly: true,
        });

        return response;
    } catch (err: any) {
        return NextResponse.json(
            {
                error: err.message,
            },
            { status: 500 },
        );
    }
}

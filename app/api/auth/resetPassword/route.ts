import connectDB from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { EmailType, sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email } = await request.json();

    const user = await User.findOne({ email });

    await sendEmail({
      email,
      emailType: EmailType.RESET,
      userId: user._id,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

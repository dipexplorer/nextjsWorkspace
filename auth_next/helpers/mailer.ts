import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export enum EmailType {
  VERIFY = "VERIFY",
  RESET = "RESET",
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: EmailType;
  userId: string;
}) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);
    const expiry = Date.now() + 3600000; // 1 hour

    const updateFields =
      emailType === EmailType.VERIFY
        ? { verifyToken: hashToken, verifyTokenExpiry: expiry }
        : { forgetPasswordToken: hashToken, forgetPasswordTokenExpiry: expiry };

    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true, // return the new document after it is modified
      runValidators: true, // return the new document after it is modified
    });

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "noreply@mailtrap_auth.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Password",
      html: `<p>Click the link below to ${
        emailType === EmailType.VERIFY ? "Verify your email" : "Reset Password"
      }
      <a href="${process.env.DOMAIN}/${
        emailType === EmailType.VERIFY ? "verify" : "reset"
      }?token=${hashToken}">Click Here</a>
      </p>`,
    };

    const emailResponse = await transport.sendMail(mailOptions);
    return emailResponse;
  } catch (error: any) {
    console.log(error.message);
    return new Error(error.message);
  }
};

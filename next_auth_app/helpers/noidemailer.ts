import nodemailer from "nodemailer";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";

type emailParams = {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: emailParams) => {
    try {
        const userIdString = String(userId);

        // create token
        const hashedToken = await bcrypt.hash(userIdString, 10);

        const url =
            emailType === "VERIFY"
                ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
                : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

        const user = await User.findById(userIdString);
        if (!user) throw new Error("User not found");

        // create reusable transporter object using the default SMTP transport
        if (emailType == "VERIFY") {
            await User.findByIdAndUpdate(userIdString, {
                verifyEmailToken: hashedToken,
                verifyEmailExpiry: Date.now() + 3600000,
            });
        } else if (emailType == "RESET") {
            await User.findByIdAndUpdate(userIdString, {
                resetPasswordToken: hashedToken,
                resetPasswordExpiry: Date.now() + 3600000,
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const mailOptions = {
            from: "noreply@nextauthapp.com",
            to: email,
            subject:
                emailType == "VERIFY"
                    ? "Verify your email"
                    : "Reset Your password",
            html: `
                <p>Please click the button below to ${emailType == "VERIFY" ? "verify ur email" : "reset ur password"}</p>
                <a href="${url}">Visit the link </a>
                <br>
                <p>or past the link in ur browser.</p>
                <p>${url}</p>
                <br>
                <p>This link will expire in 1 hour</p>
                <p>Ignore this email if you did not request this</p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (err: any) {
        console.error("Email sending failed:", err);
        throw err;
    }
};

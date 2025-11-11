import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);
    const expiry = Date.now() + 360000; // 1 hour

    const updateFields =
      emailType === "VERIFY"
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
        user: "526c6ec291f130",
        pass: "7f826148979299",
      },
    });

    const mailOptions = {
      from: "noreply@yourdomain.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Password",
      html: `<p>Click the link below to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    const emailResponse = await transport.sendMail(mailOptions);
    return emailResponse;
  } catch (error: any) {
    console.log(error.message);
    return new Error(error.message);
  }
};

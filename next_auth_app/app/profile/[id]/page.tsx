"use client";
import axios from "axios";

export default async function UserProfile({ params }: any) {
    const { id } = params;

    async function sendResetPasswordEmail() {
        try {
            const res = await axios.post("/api/user/resetpassword", {
                userId: id,
            });
            if (res.status === 200) {
                alert("Reset email sent");
                console.log("Email sent successfully");
            }
        } catch (err: any) {
            console.log(err);
            throw new Error(err.message);
        }
    }
    return (
        <div>
            <h1>User Profile</h1>
            {/* Render user profile details here */}
            <p>User ID: {id}</p>
            {/* Add more user details as needed */}
            <p>Update your profile </p>
            {/* reset password */}
            <button
                className="p-5 bg-red-500 text-black rounded-md"
                onClick={sendResetPasswordEmail}
            >
                Reset Password
            </button>
            <p>
                An email is forwared of reseting your password, view the email
                and click on the reset link...
            </p>
        </div>
    );
}

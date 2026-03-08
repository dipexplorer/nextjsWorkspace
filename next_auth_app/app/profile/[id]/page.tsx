export default async function UserProfile({ params }: any) {
    const { id } = await params;
    return (
        <div>
            <h1>User Profile</h1>
            {/* Render user profile details here */}
            <p>User ID: {id}</p>
            {/* Add more user details as needed */}
            <p>Update your profile </p>
            {/* reset password */}
            <button className="">Reset Password</button>
            <p>
                An email is forwared of reseting your password, view the email
                and click on the reset link...
            </p>
        </div>
    );
}

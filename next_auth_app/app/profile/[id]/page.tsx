export default async function UserProfile({ params }: any) {
  const { id } = await params;
  return (
    <div>
      <h1>User Profile</h1>
      {/* Render user profile details here */}
      <p>User ID: {id}</p>
      {/* Add more user details as needed */}
      <p>More user details...</p>
    </div>
  );
}

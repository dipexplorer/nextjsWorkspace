// profile/[id]/page.tsx
import React from "react";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-center">
        User Profile: {params.id}
      </h1>
    </div>
  );
}

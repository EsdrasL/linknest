interface UserPage {
  params: Promise<{ username: string }>;
}

export default async function UserPage({ params }: UserPage) {
  const { username } = await params;

  return <div className="max-w-3xl mx-auto mt-8 p-8 space-y-6">{username}</div>;
}

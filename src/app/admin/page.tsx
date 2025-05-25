import { getCurrentUser } from "./actions";

export default async function AdminPage() {
  const user = getCurrentUser();

  return (
    <div>
      <h1>Admin</h1>
      <p>User: {user}</p>
    </div>
  );
}

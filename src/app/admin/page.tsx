import LinkList from "@/components/LinkList";
import { addLinkAction, removeLinkAction } from "./actions";
import AddLink from "@/components/AddLink";
import { redirect } from "next/navigation";
import { dependencyContainer } from "@/lib/dependencyContainer";
import { getUserLinkConfig } from "@/core/usecases/getUserLinkConfig";

export default async function AdminPage() {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/login");
  }

  const linkConfig = await getUserLinkConfig(userId, dependencyContainer);

  return (
    <div>
      <h1>Admin</h1>

      <AddLink onAddLink={addLinkAction} />

      {linkConfig ? <LinkList links={linkConfig.links} onRemoveLink={removeLinkAction} /> : <p>No links yet</p>}
    </div>
  );
}

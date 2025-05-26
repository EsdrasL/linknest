import { addLinkAction, removeLinkAction, updateLinkAction } from "./actions";
import AddLink from "@/components/AddLink";
import { redirect } from "next/navigation";
import { dependencyContainer } from "@/lib/dependencyContainer";
import { getUserLinkConfig } from "@/core/usecases/getUserLinkConfig";
import LinkCard from "@/components/LinkCard";
import { Link as LinkIcon } from "lucide-react";

export default async function AdminPage() {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/login");
  }

  const linkConfig = await getUserLinkConfig(userId, dependencyContainer);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 space-y-6">
      <AddLink onAddLink={addLinkAction} />

      <div className="space-y-4">
        {linkConfig?.links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onUpdateLink={updateLinkAction}
            onRemoveLink={removeLinkAction}
          />
        ))}

        {!linkConfig?.links.length && (
          <div className="flex justify-center items-center">
            <LinkIcon className="w-5 h-5 mr-2" />
            <p className="text-lg">No links yet. Start adding!</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { addLinkAction, removeLinkAction, updateLinkAction } from "./actions";
import AddLink from "@/components/AddLink";
import { redirect } from "next/navigation";
import { dependencyContainer } from "@/lib/dependencyContainer";
import { getUserLinkConfig } from "@/core/usecases/getUserLinkConfig";
import LinkCard from "@/components/LinkCard";
import { Link as LinkIcon, ExternalLink } from "lucide-react";
import { getUser } from "@/core/usecases/getUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminPage() {
  const userId = await dependencyContainer.authService.verifySession();

  if (!userId) {
    redirect("/admin/login");
  }

  const userPromise = getUser(userId, dependencyContainer);
  const linkConfigPromise = getUserLinkConfig(userId, dependencyContainer);

  const [user, linkConfig] = await Promise.all([
    userPromise,
    linkConfigPromise,
  ]);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Hello {user?.username}</h1>
        <Button variant="outline" asChild>
          <Link href={`/${user?.username}`} target="_blank">
            <ExternalLink className="w-4 h-4" /> Check my page
          </Link>
        </Button>
      </div>

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

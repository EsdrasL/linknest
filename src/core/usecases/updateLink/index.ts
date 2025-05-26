import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { Link } from "../../models/LinkConfig";

export async function updateLink(
  userId: string,
  updatedLink: Pick<Link, "id"> &
    Partial<Pick<Link, "title" | "url" | "active">>,
  dependencies: { linkConfigRepository: LinkConfigRepository }
) {
  const linkConfig = await dependencies.linkConfigRepository.findByUserId(
    userId
  );

  if (!linkConfig) return null;

  const updatedLinks = linkConfig?.links.map((link) => {
    if (link.id === updatedLink.id) return { ...link, ...updatedLink };
    return link;
  });

  await dependencies.linkConfigRepository.updateLinks(userId, updatedLinks);
}

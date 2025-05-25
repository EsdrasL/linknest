import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { Link } from "../models/LinkConfig";
import { randomUUID } from "crypto";

export async function addLink(
  userId: string,
  data: { title: string; url: string },
  dependencies: { linkConfigRepository: LinkConfigRepository }
) {
  const link: Link = {
    id: randomUUID(),
    active: true,
    title: data.title,
    url: data.url,
    type: "link",
  };

  await dependencies.linkConfigRepository.addLink(userId, link);

  return link;
}

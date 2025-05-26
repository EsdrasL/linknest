import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { LinkConfig } from "../../models/LinkConfig";

export async function getUserLinkConfig(
  userId: string,
  dependencies: { linkConfigRepository: LinkConfigRepository }
): Promise<LinkConfig | null> {
  const linkConfig = await dependencies.linkConfigRepository.findByUserId(
    userId
  );

  return linkConfig;
}

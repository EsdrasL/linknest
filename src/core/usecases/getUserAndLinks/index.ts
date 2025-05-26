import { User } from "@/core/models/User";
import { UserRepository } from "@/core/interfaces/UserRepository";
import { LinkConfigRepository } from "../../interfaces/LinkConfigRepository";
import { Link } from "../../models/LinkConfig";

export async function getUserAndLinks(
  username: string,
  dependencies: {
    userRepository: UserRepository;
    linkConfigRepository: LinkConfigRepository;
  }
): Promise<{ user: User; links: Link[] } | null> {
  const user = await dependencies.userRepository.findByUsername(username);
  if (!user) return null;

  const linkConfig = await dependencies.linkConfigRepository.findByUserId(
    user.id
  );
  if (!linkConfig) return null;

  return {
    user,
    links: linkConfig.links,
  };
}

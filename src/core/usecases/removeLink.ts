import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { Link } from "@/core/models/LinkConfig";

export async function removeLink(
  userId: string,
  link: Link,
  dependencies: { linkConfigRepository: LinkConfigRepository }
) {
  await dependencies.linkConfigRepository.removeLink(userId, link);
}

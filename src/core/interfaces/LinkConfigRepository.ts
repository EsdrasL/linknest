import { Link, LinkConfig } from "@/core/models/LinkConfig";

export interface LinkConfigRepository {
  findByUserId(id: string): Promise<LinkConfig | null>;
  create(userId: string): Promise<void>;
  addLink(userId: string, link: Link): Promise<void>;
  removeLink(userId: string, link: Link): Promise<void>;
}

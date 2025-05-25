import {
  CollectionReference,
  FieldValue,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Link, LinkConfig } from "@/core/models/LinkConfig";
import { firestore } from "@/lib/firebase";
import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";

export class FirestoreLinkConfigRepository implements LinkConfigRepository {
  private links: CollectionReference<LinkConfig>;

  constructor() {
    this.links = firestore.collection("links").withConverter({
      toFirestore: (data: LinkConfig) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as LinkConfig,
    });
  }

  async findByUserId(id: string): Promise<LinkConfig | null> {
    const document = await this.links.doc(id).get();

    if (!document.exists) return null;

    const linkData = document.data() as LinkConfig;

    return {
      userId: linkData.userId,
      links: linkData.links,
    };
  }

  async create(userId: string): Promise<void> {
    await this.links.doc(userId).set({ userId, links: [] });
  }

  async addLink(userId: string, link: Link): Promise<void> {
    await this.links.doc(userId).update({ links: FieldValue.arrayUnion(link) });
  }

  async removeLink(userId: string, link: Link): Promise<void> {
    await this.links
      .doc(userId)
      .update({ links: FieldValue.arrayRemove(link) });
  }
}

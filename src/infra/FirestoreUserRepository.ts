import {
  CollectionReference,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import bcrypt from "bcrypt";
import { User } from "@/core/models/User";
import { firestore } from "@/lib/firebase";
import { UserRepository } from "@/core/interfaces/UserRepository";

interface FirestoreUser extends User {
  password: string;
}

export class FirestoreUserRepository implements UserRepository {
  private users: CollectionReference<FirestoreUser>;

  constructor() {
    this.users = firestore.collection("users").withConverter({
      toFirestore: (data: FirestoreUser) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as FirestoreUser,
    });
  }

  async findById(id: string): Promise<User | null> {
    const userDocument = await this.users.doc(id).get();
    if (!userDocument.exists) return null;

    const userData = userDocument.data();
    if (!userData) return null;

    return { id: userData.id, name: userData.name, email: userData.email };
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = await this.users.where("email", "==", email).get();

    if (!query.size) return null;

    const userData = query.docs[0].data();
    return { id: userData.id, name: userData.name, email: userData.email };
  }

  async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const documentReference = this.users.doc();
    await documentReference.set({
      id: documentReference.id,
      name,
      email,
      password: hashedPassword,
    });

    return { id: documentReference.id, name, email };
  }
}

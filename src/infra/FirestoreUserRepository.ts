import {
  CollectionReference,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { User } from "@/core/models/User";
import { firestore } from "@/lib/firebase";
import { UserRepository } from "@/core/interfaces/UserRepository";
import { PasswordHasher } from "@/core/interfaces/PasswordHasher";

interface FirestoreUser extends User {
  password: string;
}

export class FirestoreUserRepository implements UserRepository {
  private passwordHasher: PasswordHasher;
  private users: CollectionReference<FirestoreUser>;

  constructor(passwordHasher: PasswordHasher) {
    this.passwordHasher = passwordHasher;
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

    return { id: userData.id, username: userData.username, email: userData.email };
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = await this.users.where("email", "==", email).get();

    if (!query.size) return null;

    const userData = query.docs[0].data();
    return { id: userData.id, username: userData.username, email: userData.email };
  }

  async create({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await this.passwordHasher.hash(password);

    const documentReference = this.users.doc();
    await documentReference.set({
      id: documentReference.id,
      username,
      email,
      password: hashedPassword,
    });

    return { id: documentReference.id, username, email };
  }

  async findByEmailWithPassword(email: string) {
    const query = await this.users.where("email", "==", email).get();

    if (!query.size) return null;

    const userData = query.docs[0].data();
    return {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      passwordHash: userData.password,
    };
  }
}

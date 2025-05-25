import { User } from "@/core/models/User";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: {
    name: string;
    email: string;
    password: string;
  }): Promise<User>;
  findByEmailWithPassword(email: string): Promise<(User & { passwordHash: string }) | null>;
}

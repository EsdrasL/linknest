import { BcryptPasswordHasher } from "@/infra/BcryptPasswordHasher";
import { FirestoreUserRepository } from "@/infra/FirestoreUserRepository";
import { FirestoreLinkConfigRepository } from "@/infra/FirestoreLinkConfigRepository";
import { JwtCookieAuthService } from "@/infra/JwtCookieAuthService";

const authService = new JwtCookieAuthService();
const passwordHasher = new BcryptPasswordHasher();
const userRepository = new FirestoreUserRepository(passwordHasher);
const linkConfigRepository = new FirestoreLinkConfigRepository();

export const dependencyContainer = {
  authService,
  userRepository,
  linkConfigRepository,
  passwordHasher,
};

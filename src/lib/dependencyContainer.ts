import { BcryptPasswordHasher } from "@/infra/BcryptPasswordHasher";
import { FirestoreUserRepository } from "@/infra/FirestoreUserRepository";
import { JwtCookieAuthService } from "@/infra/JwtCookieAuthService";

const authService = new JwtCookieAuthService();
const passwordHasher = new BcryptPasswordHasher();
const userRepository = new FirestoreUserRepository(passwordHasher);

export const dependencyContainer = {
  authService,
  userRepository,
  passwordHasher,
};

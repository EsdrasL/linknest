import { FirestoreUserRepository } from "@/infra/FirestoreUserRepository";
import { JwtCookieAuthService } from "@/infra/JwtCookieAuthService";

export const dependencyContainer = {
  authService: new JwtCookieAuthService(),
  userRepository: new FirestoreUserRepository(),
};

import { User } from "@/core/models/User";
import { AuthService } from "@/core/interfaces/AuthService";
import { UserRepository } from "@/core/interfaces/UserRepository";
import { LinkConfigRepository } from "../interfaces/LinkConfigRepository";

export async function signUpUser(
  username: string,
  email: string,
  password: string,
  dependencies: {
    userRepository: UserRepository;
    linkConfigRepository: LinkConfigRepository;
    authService: AuthService;
  }
): Promise<User> {
  const existingEmail = await dependencies.userRepository.findByEmail(email);
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const existingUsername = await dependencies.userRepository.findByUsername(
    username
  );
  if (existingUsername) {
    throw new Error("Username already exists");
  }

  const user = await dependencies.userRepository.create({
    username,
    email,
    password,
  });

  await dependencies.linkConfigRepository.create(user.id);

  await dependencies.authService.createSession(user.id);

  return user;
}

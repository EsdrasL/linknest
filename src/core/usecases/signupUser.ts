import { User } from "@/core/models/User";
import { AuthService } from "@/core/interfaces/AuthService";
import { UserRepository } from "@/core/interfaces/UserRepository";

export async function signUpUser(
  username: string,
  email: string,
  password: string,
  dependencies: {
    userRepository: UserRepository;
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

  await dependencies.authService.createSession(user.id);

  return user;
}

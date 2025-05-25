import { User } from "@/core/models/User";
import { AuthService } from "@/core/interfaces/AuthService";
import { UserRepository } from "@/core/interfaces/UserRepository";
import { PasswordHasher } from "../interfaces/PasswordHasher";

export async function loginUser(
  email: string,
  password: string,
  dependencies: {
    userRepository: UserRepository;
    authService: AuthService;
    passwordHasher: PasswordHasher;
  }
): Promise<User | null> {
  const userRecord = await dependencies.userRepository.findByEmailWithPassword(
    email
  );
  if (!userRecord) return null;

  const valid = await dependencies.passwordHasher.compare(
    password,
    userRecord.passwordHash
  );

  if (!valid) return null;

  const user = {
    id: userRecord.id,
    email: userRecord.email,
    username: userRecord.username,
  };

  await dependencies.authService.createSession(user.id);

  return user;
}

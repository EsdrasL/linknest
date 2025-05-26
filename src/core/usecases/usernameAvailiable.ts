import { UserRepository } from "@/core/interfaces/UserRepository";

export async function usernameAvailiable(
  username: string,
  dependencies: {
    userRepository: UserRepository;
  }
): Promise<boolean> {
  const existingUsername = await dependencies.userRepository.findByUsername(
    username
  );
  return !existingUsername;
}

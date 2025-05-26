import { User } from "@/core/models/User";
import { UserRepository } from "@/core/interfaces/UserRepository";

export async function getUser(
  id: string,
  dependencies: {
    userRepository: UserRepository;
  }
): Promise<User | null> {
  const user = await dependencies.userRepository.findById(id);

  return user;
}

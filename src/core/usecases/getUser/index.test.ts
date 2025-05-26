import { UserRepository } from "@/core/interfaces/UserRepository";
import { User } from "@/core/models/User";
import { getUser } from ".";
import { MockUserRepository } from "@/infra/FirestoreUserRepository/mock";

describe("getUser usecase", () => {
  const userId = "user-123";
  const mockUser: User = {
    id: userId,
    username: "doe",
    email: "doe@example.com",
  };

  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = MockUserRepository();
  });

  it("should return the user if found", async () => {
    mockUserRepository.findById.mockResolvedValue(mockUser);

    const result = await getUser(userId, {
      userRepository: mockUserRepository,
    });

    expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockUser);
  });

  it("should return null if the user is not found", async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const result = await getUser(userId, {
      userRepository: mockUserRepository,
    });

    expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    expect(result).toBeNull();
  });
});

import { MockUserRepository } from "@/infra/FirestoreUserRepository/mock";
import { usernameAvailiable } from ".";
import { UserRepository } from "@/core/interfaces/UserRepository";

describe("usernameAvailiable usecase", () => {
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = MockUserRepository();
  });

  it("should return true if username is available", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);

    const result = await usernameAvailiable("newuser", {
      userRepository: mockUserRepository,
    });

    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith("newuser");
    expect(result).toBe(true);
  });

  it("should return false if username is taken", async () => {
    mockUserRepository.findByUsername.mockResolvedValue({
      id: "1",
      username: "takenuser",
      email: "test@example.com",
    });

    const result = await usernameAvailiable("takenuser", {
      userRepository: mockUserRepository,
    });

    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith("takenuser");
    expect(result).toBe(false);
  });
});

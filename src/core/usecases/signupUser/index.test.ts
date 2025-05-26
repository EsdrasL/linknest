import { signUpUser } from ".";
import { UserRepository } from "@/core/interfaces/UserRepository";
import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { AuthService } from "@/core/interfaces/AuthService";
import { MockLinkConfigRepository } from "@/infra/FirestoreLinkConfigRepository/mock";
import { MockUserRepository } from "@/infra/FirestoreUserRepository/mock";
import { MockAuthService } from "@/infra/JwtCookieAuthService/mock";

describe("signUpUser usecase", () => {
  const username = "testuser";
  const email = "test@example.com";
  const password = "password123";
  const user = { id: "user-1", username, email };

  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockLinkConfigRepository: jest.Mocked<LinkConfigRepository>;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockUserRepository = MockUserRepository();
    mockLinkConfigRepository = MockLinkConfigRepository();
    mockAuthService = MockAuthService();
  });

  it("should create user, link config, and session when data is valid", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.findByUsername.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(user);

    const result = await signUpUser(username, email, password, {
      userRepository: mockUserRepository,
      linkConfigRepository: mockLinkConfigRepository,
      authService: mockAuthService,
    });

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      username,
      email,
      password,
    });
    expect(mockLinkConfigRepository.create).toHaveBeenCalledWith(user.id);
    expect(mockAuthService.createSession).toHaveBeenCalledWith(user.id);
    expect(result).toEqual(user);
  });

  it("should throw error if email is already taken", async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: "other",
      email,
      username: "other",
    });

    await expect(
      signUpUser(username, email, password, {
        userRepository: mockUserRepository,
        linkConfigRepository: mockLinkConfigRepository,
        authService: mockAuthService,
      })
    ).rejects.toThrow("Email not available");

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(mockUserRepository.findByUsername).not.toHaveBeenCalled();
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });

  it("should throw error if username is already taken", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.findByUsername.mockResolvedValue({
      id: "other",
      email: "other@example.com",
      username,
    });

    await expect(
      signUpUser(username, email, password, {
        userRepository: mockUserRepository,
        linkConfigRepository: mockLinkConfigRepository,
        authService: mockAuthService,
      })
    ).rejects.toThrow("Username not available");

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});

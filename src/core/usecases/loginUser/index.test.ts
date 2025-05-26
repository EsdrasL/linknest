import { UserRepository } from "@/core/interfaces/UserRepository";
import { loginUser } from "./index";
import { AuthService } from "@/core/interfaces/AuthService";
import { PasswordHasher } from "@/core/interfaces/PasswordHasher";
import { MockUserRepository } from "@/infra/FirestoreUserRepository/mock";
import { MockAuthService } from "@/infra/JwtCookieAuthService/mock";
import { MockPasswordHasher } from "@/infra/BcryptPasswordHasher/mock";

describe("loginUser usecase", () => {
  const mockUser = {
    id: "user-id",
    email: "test@example.com",
    username: "testuser",
    passwordHash: "hashed_password",
  };

  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockPasswordHasher: jest.Mocked<PasswordHasher>;

  beforeEach(() => {
    mockUserRepository = MockUserRepository();
    mockAuthService = MockAuthService();
    mockPasswordHasher = MockPasswordHasher();
  });

  it("should return user and create session when credentials are valid", async () => {
    mockUserRepository.findByEmailWithPassword.mockResolvedValue(mockUser);
    mockPasswordHasher.compare.mockResolvedValue(true);

    const result = await loginUser("test@example.com", "password", {
      userRepository: mockUserRepository,
      authService: mockAuthService,
      passwordHasher: mockPasswordHasher,
    });

    expect(mockUserRepository.findByEmailWithPassword).toHaveBeenCalledWith(
      "test@example.com"
    );
    expect(mockPasswordHasher.compare).toHaveBeenCalledWith(
      "password",
      mockUser.passwordHash
    );
    expect(mockAuthService.createSession).toHaveBeenCalledWith(mockUser.id);
    expect(result).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      username: mockUser.username,
    });
  });

  it("should return null when user is not found", async () => {
    mockUserRepository.findByEmailWithPassword.mockResolvedValue(null);

    const result = await loginUser("notfound@example.com", "password", {
      userRepository: mockUserRepository,
      authService: mockAuthService,
      passwordHasher: mockPasswordHasher,
    });

    expect(result).toBeNull();
    expect(mockPasswordHasher.compare).not.toHaveBeenCalled();
    expect(mockAuthService.createSession).not.toHaveBeenCalled();
  });

  it("should return null when password is invalid", async () => {
    mockUserRepository.findByEmailWithPassword.mockResolvedValue(mockUser);
    mockPasswordHasher.compare.mockResolvedValue(false);

    const result = await loginUser("test@example.com", "wrongpassword", {
      userRepository: mockUserRepository,
      authService: mockAuthService,
      passwordHasher: mockPasswordHasher,
    });

    expect(mockPasswordHasher.compare).toHaveBeenCalledWith(
      "wrongpassword",
      mockUser.passwordHash
    );
    expect(result).toBeNull();
    expect(mockAuthService.createSession).not.toHaveBeenCalled();
  });
});

import { AuthService } from "@/core/interfaces/AuthService";

export function MockAuthService(): jest.Mocked<AuthService> {
  return {
    createSession: jest.fn(),
    verifySession: jest.fn(),
    deleteSession: jest.fn(),
  };
}

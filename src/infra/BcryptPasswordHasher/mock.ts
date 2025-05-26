import { PasswordHasher } from "@/core/interfaces/PasswordHasher";

export function MockPasswordHasher(): jest.Mocked<PasswordHasher> {
  return {
    hash: jest.fn(),
    compare: jest.fn(),
  };
}

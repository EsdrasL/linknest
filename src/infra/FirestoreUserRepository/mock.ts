import { UserRepository } from "@/core/interfaces/UserRepository";

export function MockUserRepository(): jest.Mocked<UserRepository> {
  return {
    findById: jest.fn(),
    findByUsername: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    findByEmailWithPassword: jest.fn(),
  };
}

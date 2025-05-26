import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";

export function MockLinkConfigRepository(): jest.Mocked<LinkConfigRepository> {
  return {
    findByUserId: jest.fn(),
    create: jest.fn(),
    addLink: jest.fn(),
    removeLink: jest.fn(),
    updateLinks: jest.fn(),
  };
}

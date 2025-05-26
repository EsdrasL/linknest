import { getUserLinkConfig } from ".";
import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { LinkConfig } from "@/core/models/LinkConfig";
import { MockLinkConfigRepository } from "@/infra/FirestoreLinkConfigRepository/mock";

describe("getUserLinkConfig usecase", () => {
  const userId = "user-123";
  const fakeLinkConfig: LinkConfig = {
    userId,
    links: [
      {
        id: "link-1",
        title: "Test Link",
        url: "https://example.com",
        active: true,
        type: "link",
      },
    ],
  };

  let mockLinkConfigRepository: jest.Mocked<LinkConfigRepository>;

  beforeEach(() => {
    mockLinkConfigRepository = MockLinkConfigRepository();
  });

  it("should return link config when found", async () => {
    mockLinkConfigRepository.findByUserId.mockResolvedValue(fakeLinkConfig);

    const result = await getUserLinkConfig(userId, {
      linkConfigRepository: mockLinkConfigRepository,
    });

    expect(mockLinkConfigRepository.findByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(fakeLinkConfig);
  });

  it("should return null when link config is not found", async () => {
    mockLinkConfigRepository.findByUserId.mockResolvedValue(null);

    const result = await getUserLinkConfig(userId, {
      linkConfigRepository: mockLinkConfigRepository,
    });

    expect(mockLinkConfigRepository.findByUserId).toHaveBeenCalledWith(userId);
    expect(result).toBeNull();
  });
});

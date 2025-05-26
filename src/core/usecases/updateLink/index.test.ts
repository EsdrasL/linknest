import { updateLink } from ".";
import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { Link } from "@/core/models/LinkConfig";
import { MockLinkConfigRepository } from "@/infra/FirestoreLinkConfigRepository/mock";

describe("updateLink usecase", () => {
  const userId = "user-123";
  const existingLinks: Link[] = [
    {
      id: "1",
      title: "Link 1",
      url: "https://1.com",
      active: true,
      type: "link",
    },
    {
      id: "2",
      title: "Link 2",
      url: "https://2.com",
      active: false,
      type: "link",
    },
  ];
  const linkConfig = { userId, links: existingLinks };

  let mockLinkConfigRepository: jest.Mocked<LinkConfigRepository>;

  beforeEach(() => {
    mockLinkConfigRepository = MockLinkConfigRepository();
  });

  it("should update the link and persist changes", async () => {
    mockLinkConfigRepository.findByUserId.mockResolvedValue(linkConfig);

    const updatedLink = {
      id: "2",
      title: "Updated",
      url: "https://updated.com",
      active: true,
    };
    const expectedLinks = [
      existingLinks[0],
      { ...existingLinks[1], ...updatedLink },
    ];

    await updateLink(userId, updatedLink, {
      linkConfigRepository: mockLinkConfigRepository,
    });

    expect(mockLinkConfigRepository.findByUserId).toHaveBeenCalledWith(userId);
    expect(mockLinkConfigRepository.updateLinks).toHaveBeenCalledWith(
      userId,
      expectedLinks
    );
  });

  it("should return null if link config does not exist", async () => {
    mockLinkConfigRepository.findByUserId.mockResolvedValue(null);

    const updatedLink = { id: "2", title: "Updated" };
    const result = await updateLink(userId, updatedLink, {
      linkConfigRepository: mockLinkConfigRepository,
    });

    expect(result).toBeNull();
    expect(mockLinkConfigRepository.updateLinks).not.toHaveBeenCalled();
  });
});

import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { Link } from "@/core/models/LinkConfig";
import { removeLink } from "./index";
import { MockLinkConfigRepository } from "@/infra/FirestoreLinkConfigRepository/mock";

describe("removeLink", () => {
  const userId = "user-123";
  const link: Link = {
    id: "mocked-uuid",
    active: true,
    title: "My Link",
    url: "https://example.com",
    type: "link",
  };

  let mockLinkConfigRepository: jest.Mocked<LinkConfigRepository>;

  beforeEach(() => {
    mockLinkConfigRepository = MockLinkConfigRepository();
  });

  it("should call removeLink on repository with correct arguments", async () => {
    await removeLink(userId, link, {
      linkConfigRepository: mockLinkConfigRepository,
    });
    expect(mockLinkConfigRepository.removeLink).toHaveBeenCalledWith(
      userId,
      link
    );
  });
});

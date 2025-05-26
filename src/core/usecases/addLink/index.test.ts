import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { Link } from "@/core/models/LinkConfig";
import { addLink } from ".";
import { MockLinkConfigRepository } from "@/infra/FirestoreLinkConfigRepository/mock";

jest.mock("crypto", () => ({
  randomUUID: jest.fn(() => "mocked-uuid"),
}));

describe("addLink usecase", () => {
  const userId = "user-123";
  const input = { title: "My Link", url: "https://example.com" };
  const expectedLink: Link = {
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

  it("should create and persist a link", async () => {
    const result = await addLink(userId, input, {
      linkConfigRepository: mockLinkConfigRepository,
    });

    expect(mockLinkConfigRepository.addLink).toHaveBeenCalledWith(
      userId,
      expectedLink
    );
    expect(result).toEqual(expectedLink);
  });
});

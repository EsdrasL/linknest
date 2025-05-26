import { getUserAndLinks } from ".";
import { UserRepository } from "@/core/interfaces/UserRepository";
import { LinkConfigRepository } from "@/core/interfaces/LinkConfigRepository";
import { User } from "@/core/models/User";
import { Link } from "@/core/models/LinkConfig";
import { MockLinkConfigRepository } from "@/infra/FirestoreLinkConfigRepository/mock";
import { MockUserRepository } from "@/infra/FirestoreUserRepository/mock";

describe("getUserAndLinks usecase", () => {
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockLinkConfigRepository: jest.Mocked<LinkConfigRepository>;

  const fakeUser: User = {
    id: "user-1",
    username: "testuser",
  } as User;

  const fakeLinks: Link[] = [
    {
      id: "link-1",
      title: "Link 1",
      url: "https://a.com",
      active: true,
      type: "link",
    },
    {
      id: "link-2",
      title: "Link 2",
      url: "https://b.com",
      active: false,
      type: "link",
    },
  ];

  const fakeLinkConfig = {
    userId: fakeUser.id,
    links: fakeLinks,
  };

  beforeEach(() => {
    mockUserRepository = MockUserRepository();
    mockLinkConfigRepository = MockLinkConfigRepository();
  });

  it("should return user and links when both exist", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(fakeUser);
    mockLinkConfigRepository.findByUserId.mockResolvedValue(fakeLinkConfig);

    const result = await getUserAndLinks("testuser", {
      userRepository: mockUserRepository,
      linkConfigRepository: mockLinkConfigRepository,
    });

    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith("testuser");
    expect(mockLinkConfigRepository.findByUserId).toHaveBeenCalledWith(
      fakeUser.id
    );
    expect(result).toEqual({ user: fakeUser, links: fakeLinks });
  });

  it("should return null if user not found", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);

    const result = await getUserAndLinks("missinguser", {
      userRepository: mockUserRepository,
      linkConfigRepository: mockLinkConfigRepository,
    });

    expect(result).toBeNull();
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(
      "missinguser"
    );
    expect(mockLinkConfigRepository.findByUserId).not.toHaveBeenCalled();
  });

  it("should return null if linkConfig not found", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(fakeUser);
    mockLinkConfigRepository.findByUserId.mockResolvedValue(null);

    const result = await getUserAndLinks("testuser", {
      userRepository: mockUserRepository,
      linkConfigRepository: mockLinkConfigRepository,
    });

    expect(result).toBeNull();
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith("testuser");
    expect(mockLinkConfigRepository.findByUserId).toHaveBeenCalledWith(
      fakeUser.id
    );
  });
});

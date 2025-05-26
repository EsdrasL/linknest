import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "@/lib/firebase";
import { Link, LinkConfig } from "@/core/models/LinkConfig";
import { FirestoreLinkConfigRepository } from ".";

jest.mock("@/lib/firebase", () => ({
  firestore: {
    collection: jest.fn(),
  },
}));

const mockDoc = jest.fn();
const mockGet = jest.fn();
const mockSet = jest.fn();
const mockUpdate = jest.fn();

const mockWithConverter = jest.fn(() => ({
  doc: mockDoc,
}));

describe("FirestoreLinkConfigRepository", () => {
  const mockLinkConfig: LinkConfig = {
    userId: "user123",
    links: [{ id: "1", title: "A", url: "a", active: true, type: "link" }],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockDoc.mockReturnValue({
      get: mockGet,
      set: mockSet,
      update: mockUpdate,
    });

    (firestore.collection as jest.Mock).mockReturnValue({
      withConverter: mockWithConverter,
    });
  });

  it("should return LinkConfig when document exists", async () => {
    mockGet.mockResolvedValue({
      exists: true,
      data: () => mockLinkConfig,
    });

    const repo = new FirestoreLinkConfigRepository();
    const result = await repo.findByUserId("user123");

    expect(result).toEqual(mockLinkConfig);
    expect(mockDoc).toHaveBeenCalledWith("user123");
  });

  it("should return null when document does not exist", async () => {
    mockGet.mockResolvedValue({
      exists: false,
    });

    const repo = new FirestoreLinkConfigRepository();
    const result = await repo.findByUserId("user123");

    expect(result).toBeNull();
  });

  it("should set a new LinkConfig document with empty links", async () => {
    const repo = new FirestoreLinkConfigRepository();
    await repo.create("user123");

    expect(mockSet).toHaveBeenCalledWith({
      userId: "user123",
      links: [],
    });
  });

  it("should update the document using FieldValue.arrayUnion", async () => {
    const link: Link = {
      id: "1",
      title: "A",
      url: "a",
      active: true,
      type: "link",
    };

    const repo = new FirestoreLinkConfigRepository();
    await repo.addLink("user123", link);

    expect(mockUpdate).toHaveBeenCalledWith({
      links: FieldValue.arrayUnion(link),
    });
  });

  it("should update the document using FieldValue.arrayRemove", async () => {
    const link: Link = {
      id: "1",
      title: "A",
      url: "a",
      active: true,
      type: "link",
    };

    const repo = new FirestoreLinkConfigRepository();
    await repo.removeLink("user123", link);

    expect(mockUpdate).toHaveBeenCalledWith({
      links: FieldValue.arrayRemove(link),
    });
  });

  it("should update the links field with the new array", async () => {
    const updatedLinks: Link[] = [
      { id: "1", title: "A", url: "a", active: true, type: "link" },
      { id: "2", title: "B", url: "b", active: false, type: "link" },
    ];

    const repo = new FirestoreLinkConfigRepository();
    await repo.updateLinks("user123", updatedLinks);

    expect(mockUpdate).toHaveBeenCalledWith({
      links: updatedLinks,
    });
  });
});

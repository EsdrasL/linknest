import { firestore } from "@/lib/firebase";
import { PasswordHasher } from "@/core/interfaces/PasswordHasher";
import { FirestoreUserRepository } from ".";

jest.mock("@/lib/firebase", () => ({
  firestore: {
    collection: jest.fn(),
  },
}));

const mockDoc = jest.fn();
const mockGet = jest.fn();
const mockSet = jest.fn();
const mockWhere = jest.fn();

const mockWithConverter = jest.fn(() => ({
  doc: mockDoc,
  where: mockWhere,
}));

describe("FirestoreUserRepository", () => {
  const mockHasher: PasswordHasher = {
    hash: jest.fn(),
    compare: jest.fn(),
  };

  const sampleUser = {
    id: "user123",
    username: "john",
    email: "john@example.com",
    password: "hashedpw123",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockDoc.mockReturnValue({
      id: sampleUser.id,
      get: mockGet,
      set: mockSet,
    });

    mockWhere.mockReturnValue({
      get: mockGet,
    });

    (firestore.collection as jest.Mock).mockReturnValue({
      withConverter: mockWithConverter,
    });
  });

  it("returns user if document exists", async () => {
    mockGet.mockResolvedValue({
      exists: true,
      data: () => sampleUser,
    });

    const repo = new FirestoreUserRepository(mockHasher);
    const result = await repo.findById("user123");

    expect(mockDoc).toHaveBeenCalledWith("user123");
    expect(result).toEqual({
      id: sampleUser.id,
      username: sampleUser.username,
      email: sampleUser.email,
    });
  });

  it("returns null if document does not exist", async () => {
    mockGet.mockResolvedValue({ exists: false });

    const repo = new FirestoreUserRepository(mockHasher);
    const result = await repo.findById("user123");

    expect(result).toBeNull();
  });

  it("returns user if found", async () => {
    mockGet.mockResolvedValue({
      size: 1,
      docs: [{ data: () => sampleUser }],
    });

    const repo = new FirestoreUserRepository(mockHasher);
    const result = await repo.findByUsername("john");

    expect(mockWhere).toHaveBeenCalledWith("username", "==", "john");
    expect(result).toEqual({
      id: sampleUser.id,
      username: sampleUser.username,
      email: sampleUser.email,
    });
  });

  it("returns null if not found", async () => {
    mockGet.mockResolvedValue({ size: 0 });

    const repo = new FirestoreUserRepository(mockHasher);
    const result = await repo.findByUsername("john");

    expect(result).toBeNull();
  });

  it("returns user if found", async () => {
    mockGet.mockResolvedValue({
      size: 1,
      docs: [{ data: () => sampleUser }],
    });

    const repo = new FirestoreUserRepository(mockHasher);
    const result = await repo.findByEmail("john@example.com");

    expect(mockWhere).toHaveBeenCalledWith("email", "==", "john@example.com");
    expect(result).toEqual({
      id: sampleUser.id,
      username: sampleUser.username,
      email: sampleUser.email,
    });
  });

  it("returns null if not found", async () => {
    mockGet.mockResolvedValue({ size: 0 });

    const repo = new FirestoreUserRepository(mockHasher);
    const result = await repo.findByEmail("notfound@example.com");

    expect(result).toBeNull();
  });

  it("hashes password and sets user document", async () => {
    (mockHasher.hash as jest.Mock).mockResolvedValue("hashed-password");

    const repo = new FirestoreUserRepository(mockHasher);

    const result = await repo.create({
      username: "john",
      email: "john@example.com",
      password: "plain123",
    });

    expect(mockHasher.hash).toHaveBeenCalledWith("plain123");
    expect(mockSet).toHaveBeenCalledWith({
      id: sampleUser.id,
      username: "john",
      email: "john@example.com",
      password: "hashed-password",
    });

    expect(result).toEqual({
      id: sampleUser.id,
      username: "john",
      email: "john@example.com",
    });
  });

  it("returns user with passwordHash if found", async () => {
    mockGet.mockResolvedValue({
      size: 1,
      docs: [{ data: () => sampleUser }],
    });

    const repo = new FirestoreUserRepository(mockHasher);
    const result = await repo.findByEmailWithPassword("john@example.com");

    expect(result).toEqual({
      id: sampleUser.id,
      username: sampleUser.username,
      email: sampleUser.email,
      passwordHash: sampleUser.password,
    });
  });

  it("returns null if not found", async () => {
    mockGet.mockResolvedValue({ size: 0 });

    const repo = new FirestoreUserRepository(mockHasher);
    const result = await repo.findByEmailWithPassword("notfound@example.com");

    expect(result).toBeNull();
  });
});

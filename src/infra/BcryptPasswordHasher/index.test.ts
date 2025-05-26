import bcrypt from "bcrypt";
import { BcryptPasswordHasher } from ".";

jest.mock("bcrypt");

describe("BcryptPasswordHasher", () => {
  const mockHash = bcrypt.hash as jest.Mock;
  const mockCompare = bcrypt.compare as jest.Mock;

  const plainPassword = "mySecret123";
  const hashedPassword = "$2b$10$hashedexample";

  let hasher: BcryptPasswordHasher;

  beforeEach(() => {
    jest.clearAllMocks();
    hasher = new BcryptPasswordHasher();
  });

  it("should return a hashed password", async () => {
    mockHash.mockResolvedValue(hashedPassword);

    const result = await hasher.hash(plainPassword);

    expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, 10);
    expect(result).toBe(hashedPassword);
  });

  it("should throw if bcrypt.hash throws", async () => {
    mockHash.mockRejectedValue(new Error("hash failed"));

    await expect(hasher.hash(plainPassword)).rejects.toThrow("hash failed");
  });

  it("should return true when passwords match", async () => {
    mockCompare.mockResolvedValue(true);

    const result = await hasher.compare(plainPassword, hashedPassword);

    expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
    expect(result).toBe(true);
  });

  it("should return false when passwords do not match", async () => {
    mockCompare.mockResolvedValue(false);

    const result = await hasher.compare(plainPassword, hashedPassword);

    expect(result).toBe(false);
  });

  it("should throw if bcrypt.compare throws", async () => {
    mockCompare.mockRejectedValue(new Error("compare failed"));

    await expect(hasher.compare(plainPassword, hashedPassword)).rejects.toThrow(
      "compare failed"
    );
  });
});

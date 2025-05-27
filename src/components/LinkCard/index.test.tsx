import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import LinkCard from ".";
import { Link } from "@/core/models/LinkConfig";

const mockLink: Link = {
  id: "1",
  title: "My Link",
  url: "https://example.com",
  active: true,
  type: "link",
};

describe("LinkCard", () => {
  const mockUpdateLink = jest.fn();
  const mockRemoveLink = jest.fn();

  beforeEach(() => {
    mockUpdateLink.mockReset();
    mockRemoveLink.mockReset();
  });

  it("should render link title and URL", () => {
    render(
      <LinkCard
        username="john"
        link={mockLink}
        onUpdateLink={mockUpdateLink}
        onRemoveLink={mockRemoveLink}
      />
    );

    expect(screen.getByText("My Link")).toBeInTheDocument();
    expect(screen.getByText("https://example.com")).toBeInTheDocument();
  });

  it("should call onRemoveLink when remove button is clicked", async () => {
    render(
      <LinkCard
        username="john"
        link={mockLink}
        onUpdateLink={mockUpdateLink}
        onRemoveLink={mockRemoveLink}
      />
    );

    const trashBtn = screen.getByRole("button", { name: /remove link/i });
    await userEvent.click(trashBtn);

    expect(mockRemoveLink).toHaveBeenCalledWith("john", mockLink);
  });

  it("should enter edit mode when edit button is clicked", async () => {
    render(
      <LinkCard
        username="john"
        link={mockLink}
        onUpdateLink={mockUpdateLink}
        onRemoveLink={mockRemoveLink}
      />
    );

    const editBtn = screen.getByRole("button", { name: /edit link/i });
    await userEvent.click(editBtn);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it("should call onUpdateLink with correct form data", async () => {
    const user = userEvent.setup();

    const fakeAction = jest.fn(async (prevState, formData) => {
      return {
        ...prevState,
        title: formData.get("title") as string,
        url: formData.get("url") as string,
        errors: null,
      };
    });

    render(
      <LinkCard
        username="john"
        link={mockLink}
        onUpdateLink={fakeAction}
        onRemoveLink={mockRemoveLink}
      />
    );

    const editBtn = screen.getByRole("button", { name: /edit link/i });
    await user.click(editBtn);

    const titleInput = screen.getByPlaceholderText("Title");
    const urlInput = screen.getByPlaceholderText("Description");
    const saveBtn = screen.getByRole("button", { name: /save link/i });

    await user.clear(titleInput);
    await user.type(titleInput, "Updated Title");
    await user.clear(urlInput);
    await user.type(urlInput, "https://updated.com");

    await user.click(saveBtn);

    await waitFor(() =>
      expect(fakeAction).toHaveBeenCalledWith(null, expect.any(FormData))
    );

    const formData = Array.from(
      (fakeAction.mock.calls[0][1] as FormData).entries()
    );

    expect(formData).toEqual(
      expect.arrayContaining([
        ["username", "john"],
        ["id", "1"],
        ["title", "Updated Title"],
        ["url", "https://updated.com"],
      ])
    );
  });
});

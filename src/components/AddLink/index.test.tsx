import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddLink from ".";

describe("AddLink", () => {
  const mockOnAddLink = jest.fn();

  beforeEach(() => {
    mockOnAddLink.mockReset();
  });

  it("should render the add button", () => {
    render(<AddLink username="testuser" onAddLink={mockOnAddLink} />);
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("should open the sheet when button is clicked", async () => {
    const user = userEvent.setup();

    render(<AddLink username="testuser" onAddLink={mockOnAddLink} />);
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText(/add new link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument();
  });

  it("should submit the form and closes the sheet if no errors", async () => {
    const user = userEvent.setup();

    const mockState = { title: "", url: "", errors: null };
    mockOnAddLink.mockResolvedValue(mockState);

    render(<AddLink username="testuser" onAddLink={mockOnAddLink} />);
    await user.click(screen.getByRole("button", { name: /add/i }));

    await user.type(screen.getByLabelText(/title/i), "My Link");
    await user.type(screen.getByLabelText(/url/i), "https://example.com");

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    await waitFor(() => {
      expect(screen.queryByText(/add new link/i)).not.toBeInTheDocument();
    });

    expect(mockOnAddLink).toHaveBeenCalledWith(null, expect.any(FormData));
  });
});

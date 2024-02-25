import { User } from "@/types/user";
import { AvatarBadge } from "@components/avatarBadge";
import { useAuth } from "@hooks/useAuth";
import { render, screen } from "@testing-library/react";

jest.mock("@hooks/useAuth");

jest.mock("@hooks/useTheme", () => ({
  useTheme: jest.fn(() => ({
    theme: "light",
    setTheme: jest.fn(),
  })),
}));

const useAuthMock = useAuth as jest.MockedFunction<typeof useAuth>;

describe("AvatarBadge component", () => {
  beforeAll(() => {
    useAuthMock.mockReturnValue({
      user: {
        id: "1",
        name: "John Doe",
        role: "PROVIDER",
        email: "email@email.com",
        avatar: "https://avatars.githubusercontent.com/u/41171735?v=4",
      } as User,
    });
  });
  it("should render the AvatarBadge component", () => {
    const { container } = render(<AvatarBadge />);
    expect(container).toBeInTheDocument();
  });

  it("should have the user name", () => {
    const { getByText } = render(<AvatarBadge />);
    expect(getByText("John Doe")).toBeInTheDocument();
  });

  it("should have the user provider role", () => {
    const { getByText } = render(<AvatarBadge />);
    expect(getByText("Consultor")).toBeInTheDocument();
  });

  it("should render user requester role", () => {
    useAuthMock.mockReturnValueOnce({
      user: {
        id: "1",
        name: "John Doe",
        role: "REQUESTER",
        email: "vncssnts31@gmail.com",
        avatar: "https://avatars.githubusercontent.com/u/41171735?v=4",
      },
    });

    const { getByText } = render(<AvatarBadge />);
    expect(getByText("Solicitante")).toBeInTheDocument();
  });

  it("should have render fallback avatar", async () => {
    const { getByTestId } = render(<AvatarBadge />);

    expect(getByTestId("avatar-badge-fallback")).toHaveTextContent("JD");
  });

  it("should open a dropdown menu", () => {
    const { getByTestId, container } = render(<AvatarBadge />);
    const trigger = getByTestId("trigger-dropdown-menu-avatar-badge");

    trigger.click();

    screen.debug(container);

    expect(
      screen.getByTestId("dropdown-menu-content-avatar-badge")
    ).toBeInTheDocument();
  });
});

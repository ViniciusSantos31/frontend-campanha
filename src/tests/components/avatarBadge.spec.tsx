import { User } from "@/types/user";
import { AvatarBadge } from "@components/avatarBadge";
import { useAuth } from "@hooks/useAuth";
import { render } from "@testing-library/react";

jest.mock("@hooks/useAuth");

jest.mock("@hooks/useTheme", () => ({
  useTheme: jest.fn(() => ({
    theme: "light",
    setTheme: jest.fn(),
  })),
}));

const useAuthMock = useAuth as jest.MockedFunction<typeof useAuth>;

const user: User = {
  uuid: "1",
  firstName: "John",
  lastName: "Doe",
  userType: "PROVIDER",
  company: "Company",
  cpf: "12345678901",
  createdAt: new Date().toDateString(),
  doc: "12345678901",
  phone: "12345678901",
  status: "ACTIVE",
  token_jwt: "token",
  updatedAt: new Date().toDateString(),
  watcher_id: "1",
  email: "email@email.com",
  avatar_url: "https://avatars.githubusercontent.com/u/41171735?v=4",
};

describe("AvatarBadge component", () => {
  beforeAll(() => {
    useAuthMock.mockReturnValue({
      user,
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
        ...user,
        userType: "REQUESTER",
      },
    });

    const { getByText } = render(<AvatarBadge />);
    expect(getByText("Solicitante")).toBeInTheDocument();
  });

  it("should have render fallback avatar", async () => {
    const { getByTestId } = render(<AvatarBadge />);

    expect(getByTestId("avatar-badge-fallback")).toHaveTextContent("JD");
  });
});

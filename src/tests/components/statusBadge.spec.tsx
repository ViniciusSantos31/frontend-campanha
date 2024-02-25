import { StatusBadge } from "@components/status";
import { render } from "@testing-library/react";

describe("StatusBadge component", () => {
  it("should render the status badge", () => {
    const { getByTestId } = render(
      <StatusBadge
        status="ON"
        data-testid="status-badge-test"
      />
    );

    expect(getByTestId("status-badge-test")).toBeInTheDocument();
  });

  it("should render with the correct status text when status is ON", () => {
    const { getByTestId } = render(<StatusBadge status="ON" />);

    expect(getByTestId("status-on-icon")).toBeInTheDocument();
  });

  it("should render with the correct status text when status is OFF", () => {
    const { getByTestId } = render(<StatusBadge status="OFF" />);

    expect(getByTestId("status-off-icon")).toBeInTheDocument();
  });

  it("should render with the correct status text when status is WAITING", () => {
    const { getByTestId } = render(<StatusBadge status="WAITING" />);

    expect(getByTestId("status-waiting-icon")).toBeInTheDocument();
  });

  it("should render with the correct status text when status is BUSY", () => {
    const { getByTestId } = render(<StatusBadge status="BUSY" />);

    expect(getByTestId("status-busy-icon")).toBeInTheDocument();
  });

  it("should render status ON & animation pulse", () => {
    const { getByTestId } = render(<StatusBadge status="ON" />);

    expect(getByTestId("status-on-icon")).toHaveClass("animate-pulse");
  });
});

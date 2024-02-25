import { Loader } from "@components/loader";
import { render } from "@testing-library/react";

describe("Loader component", () => {
  it("should render the Loader component", () => {
    const { container } = render(<Loader />);
    expect(container).toBeInTheDocument();
  });

  it("should have animation spin", () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId("icon-container-loader")).toHaveClass("animate-spin");
  });
});

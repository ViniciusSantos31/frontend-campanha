import { Label } from "@components/ui/label";
import { render } from "@testing-library/react";

describe("Label component", () => {
  it("should render the label", () => {
    const { getByTestId } = render(
      <Label data-testid="label-test">Label</Label>
    );

    expect(getByTestId("label-test")).toBeInTheDocument();
  });

  it("should render the label with the correct text", () => {
    const { getByText } = render(<Label>Label</Label>);

    expect(getByText("Label")).toBeInTheDocument();
  });
});

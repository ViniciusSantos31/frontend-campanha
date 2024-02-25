import { Input } from "@components/ui/input";
import { render } from "@testing-library/react";

describe("Input component", () => {
  it("should render the input", () => {
    const { getByTestId } = render(<Input data-testid="input-test" />);

    expect(getByTestId("input-test")).toBeInTheDocument();
  });

  it("should render the input with the correct placeholder", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Type here" />);

    expect(getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("should render the input with label", () => {
    const { getByText } = render(<Input label="Name" />);

    expect(getByText("Name")).toBeInTheDocument();
  });

  it("should render with the value", () => {
    const onChange = jest.fn();
    const { getByDisplayValue } = render(
      <Input
        value="Hello"
        onChange={onChange}
      />
    );

    expect(getByDisplayValue("Hello")).toBeInTheDocument();
  });
});

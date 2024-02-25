import { Button, buttonVariants } from "@components/ui/button";
import { render } from "@testing-library/react";

describe("Button component", () => {
  it("should render the button", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test">Click me</Button>
    );

    expect(getByTestId("button-test")).toBeInTheDocument();
  });

  it("should render the button with the correct text", () => {
    const { getByText } = render(<Button>Click me</Button>);

    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("should render the button with the default variant", () => {
    const { getByText } = render(<Button>Click me</Button>);

    expect(getByText("Click me")).toHaveClass(
      buttonVariants({ variant: "default" })
    );
  });

  it("should render the button with the outline variant", () => {
    const { getByText } = render(<Button variant="outline">Click me</Button>);

    expect(getByText("Click me")).toHaveClass(
      buttonVariants({ variant: "outline" })
    );
  });

  it("should render the button with the secondary variant", () => {
    const { getByText } = render(<Button variant="secondary">Click me</Button>);

    expect(getByText("Click me")).toHaveClass(
      buttonVariants({ variant: "secondary" })
    );
  });

  it("should render the button with the destructive variant", () => {
    const { getByText } = render(
      <Button variant="destructive">Click me</Button>
    );

    expect(getByText("Click me")).toHaveClass(
      buttonVariants({ variant: "destructive" })
    );
  });

  it("should render the button with the ghost variant", () => {
    const { getByText } = render(<Button variant="ghost">Click me</Button>);

    expect(getByText("Click me")).toHaveClass(
      buttonVariants({ variant: "ghost" })
    );
  });

  it("should render the button with the link variant", () => {
    const { getByText } = render(<Button variant="link">Click me</Button>);

    expect(getByText("Click me")).toHaveClass(
      buttonVariants({ variant: "link" })
    );
  });

  it("should render the button with the sm size", () => {
    const { getByText } = render(<Button size="sm">Click me</Button>);

    expect(getByText("Click me")).toHaveClass(buttonVariants({ size: "sm" }));
  });

  it("should render the button with the lg size", () => {
    const { getByText } = render(<Button size="lg">Click me</Button>);

    expect(getByText("Click me")).toHaveClass(buttonVariants({ size: "lg" }));
  });

  it("should render the button with the icon size", () => {
    const { getByText } = render(<Button size="icon">Click me</Button>);

    expect(getByText("Click me")).toHaveClass(buttonVariants({ size: "icon" }));
  });

  it("should render the button with the loading state", () => {
    const { getByTestId, getByText } = render(
      <Button loading>Click me</Button>
    );

    expect(getByTestId("button-loader-icon")).toBeInTheDocument();
    expect(getByTestId("button-loader-icon")).toHaveClass("animate-spin");
    expect(getByText("Click me")).toBeDisabled();
  });

  it("should render the button with the disabled state", () => {
    const { getByText } = render(<Button disabled>Click me</Button>);

    expect(getByText("Click me")).toBeDisabled();
  });

  it("should call the onClick function when the button is clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);

    getByText("Click me").click();
    expect(onClick).toHaveBeenCalled();
  });

  it("should call the onClick function once", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);

    getByText("Click me").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not click the button when it's disabled", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button
        disabled
        onClick={onClick}
      >
        Click me
      </Button>
    );

    getByText("Click me").click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should not click the button when it's loading", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button
        loading
        onClick={onClick}
      >
        Click me
      </Button>
    );

    getByText("Click me").click();
    expect(onClick).not.toHaveBeenCalled();
  });
});

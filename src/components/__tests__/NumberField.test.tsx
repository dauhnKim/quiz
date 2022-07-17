import { render, screen, cleanup } from "@testing-library/react";
import NumberField from "../NumberField";

afterEach(() => {
  cleanup();
});

test("should render number field component", () => {
  render(<NumberField />);

  const numberFieldElement = screen.getByTestId("number-field");
  expect(numberFieldElement).toBeInTheDocument();
});

test("should show input with initial value set", async () => {
  render(<NumberField amount={12} />);

  const inputSelector = (await screen.findByTestId(`number-field`)).querySelector("input");
  expect(inputSelector).toHaveAttribute("type", "number");
  expect(inputSelector).toHaveAttribute("value", "12");
});

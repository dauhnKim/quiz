import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import StartQuiz from "../StartQuiz";

afterEach(() => {
  cleanup();
});

test("should start quiz component", async () => {
  render(<StartQuiz />, { wrapper: BrowserRouter });

  const descriptionText = screen.getByText(/You will be presented with/i);
  const inputSelector = (await screen.findByTestId(`number-field`)).querySelector("input");

  expect(descriptionText).toBeInTheDocument();
  expect(descriptionText).toHaveTextContent("You will be presented with 5 questions. Follow the instructions on each page. Your results will be calculated at the end.");

  expect(inputSelector).toHaveAttribute("type", "number");
  expect(inputSelector).toHaveAttribute("value", "5");

  fireEvent.change(inputSelector, { target: { value: "12" } });
  expect(descriptionText).toHaveTextContent("You will be presented with 12 questions. Follow the instructions on each page. Your results will be calculated at the end.");
  expect(inputSelector).toHaveAttribute("value", "12");

  fireEvent.change(inputSelector, { target: { value: "1" } });
  expect(descriptionText).toHaveTextContent("You will be presented with 1 question. Follow the instructions on each page. Your results will be calculated at the end.");
});

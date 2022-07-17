import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import QuizResult from "../QuizResult";

afterEach(() => {
  cleanup();
});

test("should include total time", async () => {
  render(<QuizResult />, { wrapper: BrowserRouter });
  const totalTime = screen.getByText(/Total Time/i);
  expect(totalTime).toBeInTheDocument();
});

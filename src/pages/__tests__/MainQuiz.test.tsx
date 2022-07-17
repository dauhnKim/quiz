import { render, screen, cleanup, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import MainQuiz from "../MainQuiz";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
});

test("should render number field component", async () => {
  const { container } = render(<MainQuiz />, { wrapper: BrowserRouter });

  mockedAxios.get.mockResolvedValue({
    data: {
      response_code: 0,
      results: [
        {
          category: "Animals",
          type: "multiple",
          difficulty: "hard",
          question: "Which species of Brown Bear is not extinct?",
          correct_answer: "Syrian Brown Bear",
          incorrect_answers: ["California Grizzly Bear", "Atlas Bear", "Mexican Grizzly Bear"],
        },
        {
          category: "Animals",
          type: "multiple",
          difficulty: "hard",
          question: "What is the scientific name of the cheetah?",
          correct_answer: "Acinonyx jubatus",
          incorrect_answers: ["Panthera onca", "Lynx rufus", "Felis catus"],
        },
        {
          category: "Animals",
          type: "multiple",
          difficulty: "medium",
          question: "Which animal was part of an Russian domestication experiment in 1959?",
          correct_answer: "Foxes",
          incorrect_answers: ["Pigeons", "Bears", "Alligators"],
        },
        {
          category: "Animals",
          type: "multiple",
          difficulty: "easy",
          question: "What is Grumpy Cat&#039;s real name?",
          correct_answer: "Tardar Sauce",
          incorrect_answers: ["Sauce", "Minnie", "Broccoli"],
        },
        {
          category: "Animals",
          type: "multiple",
          difficulty: "hard",
          question: "Which species is a &quot;mountain chicken&quot;?",
          correct_answer: "Frog",
          incorrect_answers: ["Chicken", "Horse", "Fly"],
        },
      ],
    },
  });

  // need to test axios function
  await waitFor(() => {
    // Provide the data object to be returned
    // mockedAxios.get.mockResolvedValue({
    //   data: [{ correct_answer: "", incorrect_answers: [], question: "" }],
    // });
    // const userList = getAllByRole("listitem");
    // expect(userList).toHaveLength(2);
    // expect(userList[0]).toHaveTextContent("Joe Doe");
    // expect(userList[1]).toHaveTextContent("Jane Doe");
  });

  await waitFor(() => {
    const groupRadio = container.querySelector(".py-10");
    expect(groupRadio).toBeInTheDocument();
    // expect(groupRadio).toHaveTextContent(/atlas bea/i);
  });
});

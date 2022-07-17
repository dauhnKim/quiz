import { render, screen, cleanup, waitFor } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { BrowserRouter } from "react-router-dom";
import MainQuiz from "../MainQuiz";

const getQuiz = async () => {
  try {
    const url = "https://opentdb.com/api.php?amount=2&category=27&type=multiple";
    const resp = await axios.get(url);
    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }
    const data = await resp.data;
    return data;
  } catch (err) {
    throw err;
  }
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  cleanup();
});

describe("getQuiz", () => {
  test("should return quiz list from api", async () => {
    //Our desired output
    const quizees = [
      {
        category: "Animals",
        type: "multiple",
        difficulty: "hard",
        question: "Which species of Brown Bear is not extinct?",
        correct_answer: "Syrian Brown Bear",
        incorrect_answers: ["California Grizzly Bear", "Atlas Bear", "Mexican Grizzly Bear"],
      },
    ];

    //Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: quizees,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axios.get).not.toHaveBeenCalled();
    const data = await getQuiz();

    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(quizees);
  });
});

afterEach(() => {
  cleanup();
});

describe("MainQuiz", () => {
  test("should return quiz list from main quiz component", async () => {
    const data = {
      results: [
        {
          question: "What was the name of the Ethiopian Wolf before they knew it was related to wolves?",
          correct_answer: "Simien Jackel",
          incorrect_answers: ["Ethiopian Coyote", "Amharic Fox", "Canis Simiensis"],
        },
      ],
    };
    mockedAxios.get.mockResolvedValue({ data: data });

    render(<MainQuiz />, { wrapper: BrowserRouter });

    await waitFor(() => {
      const question = screen.getByText(/What/i);
      expect(question).toBeInTheDocument();
    });
  });
});

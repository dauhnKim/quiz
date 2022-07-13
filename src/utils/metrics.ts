export interface QuizType {
  // category: string;
  correct_answer: string;
  // difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  // type: string;
}

export interface AnswerType {
  answer: Array<string>;
}

export interface UserAnswerType {
  isCorrect: boolean | null;
  userAnswer: string;
  answers?: Array<string>;
}

export interface UserAnswerInfoType {
  totalTime: string;
  answerInfo: Array<UserAnswerType>;
}

// Button Type
export interface PrimaryProps {
  text: string;
  className?: string;
  type?: "submit" | "button" | undefined;
  onClick: () => void;
}

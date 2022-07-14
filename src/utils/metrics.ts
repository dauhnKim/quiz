export interface QuizType {
  correct_answer: string;
  incorrect_answers: Array<string>;
  question: string;
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
export interface ChartType {
  name: string;
  value: number;
}
// Button Type
export interface PrimaryProps {
  text: string;
  className?: string;
  type?: "submit" | "button" | undefined;
  onClick: () => void;
}

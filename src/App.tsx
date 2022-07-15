import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainQuiz from "./pages/MainQuiz";
import StartQuiz from "./pages/StartQuiz";
import QuizResult from "./pages/QuizResult";

import Layout from "./components/Layout";
import ThemeProvider from "./components/ThemeProvider";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<StartQuiz />} />
            <Route path="/main-quiz" element={<MainQuiz />} />
            <Route path="/quiz-result" element={<QuizResult />} />
          </Routes>
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

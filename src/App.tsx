import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import MainQuiz from "./pages/MainQuiz";
import StartQuiz from "./pages/StartQuiz";
import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<StartQuiz />} />
            <Route path="/main-quiz" element={<MainQuiz />} />
          </Routes>
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

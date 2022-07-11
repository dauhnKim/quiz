import "./App.css";
import Layout from "./components/Layout";
import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Layout>apply dark mode</Layout>
    </ThemeProvider>
  );
}

export default App;

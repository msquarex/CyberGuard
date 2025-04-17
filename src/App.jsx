import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { QuizProvider } from "./context/QuizContext"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import NewsPage from "./pages/NewsPage"
import QuizPage from "./pages/QuizPage"
import ResultsPage from "./pages/ResultsPage"
import AboutPage from "./pages/AboutPage"
import Login from "./components/Login"
import Signup from "./components/Signup"

export default function App() {
  return (
    <ThemeProvider>
      <QuizProvider>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
      </QuizProvider>
    </ThemeProvider>
  )
}


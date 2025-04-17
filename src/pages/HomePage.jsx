import { Link } from "react-router-dom"
import "../styles/home.css"

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">CyberGuard</h1>
          <p className="hero-subtitle">Your trusted companion in the digital security landscape</p>
          <div className="hero-buttons">
            <Link to="/news" className="button button-cyan">
              Latest News
            </Link>
            <Link to="/quiz" className="button button-purple">
              Test Your Knowledge
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon cyan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
            </svg>
          </div>
          <h2 className="feature-title">Cybersecurity News</h2>
          <p className="feature-description">
            Stay updated with the latest threats, vulnerabilities, and security trends.
          </p>
          <Link to="/news" className="feature-link cyan">
            Read the latest →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon purple">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"></path>
              <path d="M8 15.5a7 7 0 0 0 8 0"></path>
              <path d="M2 12h1"></path>
              <path d="M21 12h1"></path>
              <path d="m4.93 4.93-.87-.87"></path>
              <path d="m19.07 4.93.87-.87"></path>
              <path d="M10.08 15.15 7.5 19.5"></path>
              <path d="m13.92 15.15 2.58 4.35"></path>
              <path d="M3.6 9H2"></path>
              <path d="M22 9h-1.6"></path>
            </svg>
          </div>
          <h2 className="feature-title">Knowledge Quiz</h2>
          <p className="feature-description">Test your cybersecurity knowledge with our comprehensive quizzes.</p>
          <Link to="/quiz" className="feature-link purple">
            Take a quiz →
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon green">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              <path d="M3 9h18"></path>
              <path d="M9 21V9"></path>
            </svg>
          </div>
          <h2 className="feature-title">Performance Analytics</h2>
          <p className="feature-description">View your quiz results and track your progress over time.</p>
          <Link to="/results" className="feature-link green">
            See your results →
          </Link>
        </div>
      </section>

      <section className="info-section">
        <div className="info-content">
          <div className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div>
            <h2 className="info-title">Why Cybersecurity Matters</h2>
            <p className="info-description">
              In today's interconnected world, cybersecurity is more important than ever. From personal data to critical
              infrastructure, protecting digital assets requires knowledge, vigilance, and the right tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}


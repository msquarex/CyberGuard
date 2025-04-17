"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import "../styles/results.css"
import html2canvas from "html2canvas"

export default function ResultsPage() {
  const { quizResults } = useQuiz()
  const [loading, setLoading] = useState(true)
  const resultsRef = useRef(null)
  // const barChartRef = useRef(null)
  // const pieChartRef = useRef(null)

  useEffect(() => {
    setLoading(false)
  }, [])

  const downloadAsImage = () => {
    if (resultsRef.current) {
      html2canvas(resultsRef.current, {
        backgroundColor: "#111827", 
        scale: 2, 
      }).then((canvas) => {
        const image = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = image
        link.download = "cybersecurity-quiz-results.png"
        link.click()
      })
    }
  }

  const calculateCategoryPerformance = () => {
    if (!quizResults || !quizResults.answers) return {}

    const categories = {
      "Network Security": [0, 3, 8],
      Authentication: [4, 6],
      Malware: [2, 5, 9],
      "General Concepts": [1, 7],
    }

    const performance = {}

    for (const [category, questionIndices] of Object.entries(categories)) {
      const categoryQuestions = questionIndices.length
      let correctAnswers = 0

      questionIndices.forEach((index) => {
        if (quizResults.answers[index] && quizResults.answers[index].isCorrect) {
          correctAnswers++
        }
      })

      performance[category] = {
        correct: correctAnswers,
        total: categoryQuestions,
        percentage: Math.round((correctAnswers / categoryQuestions) * 100),
      }
    }

    return performance
  }

  const categoryPerformance = quizResults ? calculateCategoryPerformance() : {}

  /* Commenting out graph drawing functions
  const drawBarChart = () => {
    const canvas = barChartRef.current
    if (!canvas || !quizResults) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const barWidth = 60
    const barSpacing = 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set background
    ctx.fillStyle = "#111827"
    ctx.fillRect(0, 0, width, height)

    // Draw title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 16px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Category Performance", width / 2, 25)

    // Draw axes
    ctx.strokeStyle = "#4b5563"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.stroke()

    // Draw y-axis labels
    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px Arial, sans-serif"
    ctx.textAlign = "right"

    for (let i = 0; i <= 5; i++) {
      const value = i * 20
      const y = height - padding - (i * (height - 2 * padding)) / 5
      ctx.fillText(value + "%", padding - 10, y + 5)

      // Draw grid lines
      ctx.strokeStyle = "#374151"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw bars
    const categories = Object.keys(categoryPerformance)
    const values = categories.map((cat) => categoryPerformance[cat].percentage)

    categories.forEach((category, index) => {
      const value = values[index]
      const barHeight = (value / 100) * (height - 2 * padding)
      const x = padding + index * (barWidth + barSpacing) + barSpacing
      const y = height - padding - barHeight

      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, height - padding)
      gradient.addColorStop(0, "#0891b2")
      gradient.addColorStop(1, "#06b6d4")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw category label
      ctx.fillStyle = "#d1d5db"
      ctx.font = "12px Arial, sans-serif"
      ctx.textAlign = "center"
      let displayName = category
      if (category.length > 10) {
        displayName = category
          .split(" ")
          .map((word) => word[0])
          .join("")
      }
      ctx.fillText(displayName, x + barWidth / 2, height - padding + 20)

      // Draw value label
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px Arial, sans-serif"
      ctx.fillText(value + "%", x + barWidth / 2, y - 10)
    })
  }

  const drawPieChart = () => {
    const canvas = pieChartRef.current
    if (!canvas || !quizResults) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set background
    ctx.fillStyle = "#111827"
    ctx.fillRect(0, 0, width, height)

    // Draw title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 16px Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Correct vs. Incorrect Answers", width / 2, 25)

    // Calculate values
    const correct = quizResults.score
    const incorrect = quizResults.totalQuestions - quizResults.score
    const total = correct + incorrect

    // Draw pie slices
    const colors = ["#0891b2", "#be185d"]
    let startAngle = 0

    [correct, incorrect].forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total

      ctx.fillStyle = colors[index]
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Draw value labels
      const labelAngle = startAngle + sliceAngle / 2
      const labelX = centerX + radius * 0.7 * Math.cos(labelAngle)
      const labelY = centerY + radius * 0.7 * Math.sin(labelAngle)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Arial, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(value, labelX, labelY)

      startAngle += sliceAngle
    })

    // Draw legend
    const legendItems = ["Correct", "Incorrect"]
    const legendX = width - 100
    const legendY = height - 80

    legendItems.forEach((item, index) => {
      const y = legendY + index * 25

      ctx.fillStyle = colors[index]
      ctx.fillRect(legendX, y, 15, 15)

      ctx.fillStyle = "#d1d5db"
      ctx.font = "14px Arial, sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(item, legendX + 25, y + 7)
    })
  }
  */

  /* Commenting out graph effect
  useEffect(() => {
    if (quizResults) {
      drawBarChart()
      drawPieChart()
    }
  }, [quizResults])
  */

  if (loading) {
    return <div className="loading-spinner"></div>
  }

  if (!quizResults) {
    return (
      <div className="no-results">
        <h1>No Results Found</h1>
        <p>You haven't taken any quizzes yet.</p>
        <Link to="/quiz" className="take-quiz-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 2v6h-6"></path>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M3 12a9 9 0 0 0 15 6.7L21 16"></path>
            <path d="M21 22v-6h-6"></path>
          </svg>
          Take a Quiz
        </Link>
      </div>
    )
  }

  const percentage = Math.round((quizResults.score / quizResults.totalQuestions) * 100)

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Your Quiz Results</h1>
        <p>See how well you did and analyze your performance</p>
      </div>

      <div ref={resultsRef} className="results-content">
        <div className="score-summary">
          <div className="score-info">
            <h2>Your Score</h2>
            <p>
              You answered {quizResults.score} out of {quizResults.totalQuestions} questions correctly
            </p>
          </div>

          <div className="score-chart">
            <div className="percentage">{percentage}%</div>
            <svg className="progress-ring" width="120" height="120" viewBox="0 0 120 120">
              <circle className="progress-ring-circle-bg" cx="60" cy="60" r="54" strokeWidth="12" />
              <circle
                className={`progress-ring-circle ${percentage >= 70 ? "high" : percentage >= 40 ? "medium" : "low"}`}
                cx="60"
                cy="60"
                r="54"
                strokeWidth="12"
                strokeDasharray={`${percentage * 3.39} 339.292`}
                transform="rotate(-90, 60, 60)"
              />
            </svg>
          </div>
        </div>

        {/* Commenting out charts container
        <div className="charts-container">
          <div className="chart-card">
            <canvas ref={barChartRef} width="400" height="300"></canvas>
          </div>
          <div className="chart-card">
            <canvas ref={pieChartRef} width="400" height="300"></canvas>
          </div>
        </div>
        */}

        <div className="question-breakdown">
          <h2>Question Breakdown</h2>

          <div className="questions-list">
            {quizResults.answers.map((answer, index) => (
              <div key={index} className={`question-item ${answer.isCorrect ? "correct" : "incorrect"}`}>
                <div className="question-content">
                  {answer.isCorrect ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="check-icon"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="x-icon"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  )}

                  <div>
                    <h3>
                      Question {index + 1}: {answer.question}
                    </h3>
                    {!answer.isCorrect && (
                      <p className="correct-answer">Correct answer: Option {answer.correctAnswer + 1}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="download-container">
        <button onClick={downloadAsImage} className="download-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Results as Image
        </button>
      </div>
    </div>
  )
}


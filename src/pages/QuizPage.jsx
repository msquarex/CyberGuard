"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuiz } from "../context/QuizContext"
import "../styles/quiz.css"

export default function QuizPage() {
  const navigate = useNavigate()
  const { updateQuizResults } = useQuiz()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])

  
  const questions = [
    {
      question: "What is phishing?",
      options: [
        "A type of fish that hackers use as mascots",
        "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity",
        "A method to recover lost passwords",
        "A technique to improve network speed",
      ],
      correctAnswer: 1,
    },
    {
      question: "What does the acronym 'DDoS' stand for?",
      options: [
        "Data Deletion on Server",
        "Distributed Database of Security",
        "Distributed Denial of Service",
        "Dynamic Domain of Service",
      ],
      correctAnswer: 2,
    },
    {
      question: "Which of the following is NOT a good password practice?",
      options: [
        "Using a different password for each account",
        "Including a mix of letters, numbers, and symbols",
        "Writing down passwords on a sticky note near your computer",
        "Using a password manager",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is a firewall?",
      options: [
        "A physical wall that prevents fires in server rooms",
        "A network security device that monitors incoming and outgoing traffic",
        "A type of computer virus",
        "A backup system for data",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is two-factor authentication (2FA)?",
      options: [
        "Using two different passwords for the same account",
        "A security process requiring two different authentication methods",
        "Logging in from two different devices simultaneously",
        "Changing your password twice a year",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which of these is an example of malware?",
      options: ["Firewall", "Antivirus", "Ransomware", "Encryption"],
      correctAnswer: 2,
    },
    {
      question: "What is social engineering in the context of cybersecurity?",
      options: [
        "Building social networks securely",
        "Psychological manipulation to trick users into making security mistakes",
        "Using social media platforms to enhance security",
        "A method of secure communication between teams",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is encryption?",
      options: [
        "The process of hiding data by converting it into code",
        "The process of deleting sensitive data",
        "A type of computer virus",
        "A method to speed up internet connection",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is a VPN used for?",
      options: [
        "Increasing internet speed",
        "Creating private networks and encrypting internet connections",
        "Storing passwords securely",
        "Blocking all websites",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a zero-day vulnerability?",
      options: [
        "A software bug that exists for zero days",
        "A security flaw unknown to the software vendor that hackers can exploit",
        "A day when no new security threats are discovered",
        "A vulnerability that affects zero users",
      ],
      correctAnswer: 1,
    },
  ]

  const handleAnswerSelect = (index) => {
    if (!isAnswered) {
      setSelectedAnswer(index)
    }
  }

  const handleNextQuestion = () => {
    // Save the answer
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    const questionData = questions[currentQuestion]

    setAnswers([
      ...answers,
      {
        question: questionData.question,
        userAnswer: selectedAnswer,
        correctAnswer: questionData.correctAnswer,
        isCorrect,
      },
    ])

    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      const results = {
        score: isCorrect ? score + 1 : score,
        totalQuestions: questions.length,
        answers: [
          ...answers,
          {
            question: questionData.question,
            userAnswer: selectedAnswer,
            correctAnswer: questionData.correctAnswer,
            isCorrect,
          },
        ],
      }

      updateQuizResults(results)
      navigate("/results")
    }
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      setIsAnswered(true)
    }
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>Cybersecurity Quiz</h1>
        <p>Test your knowledge about cybersecurity concepts and best practices</p>
      </div>

      <div className="quiz-container">
        <div className="quiz-info">
          <span className="question-counter">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="score-counter">Score: {score}</span>
        </div>

        <h2 className="question-text">{currentQuestionData.question}</h2>

        <div className="options-container">
          {currentQuestionData.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`option ${
                selectedAnswer === index
                  ? isAnswered
                    ? index === currentQuestionData.correctAnswer
                      ? "correct"
                      : "incorrect"
                    : "selected"
                  : ""
              } ${isAnswered && index === currentQuestionData.correctAnswer ? "correct" : ""}`}
            >
              <div className="option-content">
                <span>{option}</span>
                {isAnswered && (
                  <>
                    {index === currentQuestionData.correctAnswer ? (
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
                    ) : selectedAnswer === index ? (
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
                    ) : null}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-actions">
          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className={`check-button ${selectedAnswer === null ? "disabled" : ""}`}
            >
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
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Check Answer
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


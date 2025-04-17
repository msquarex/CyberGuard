import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quizResults, setQuizResults] = useState(null);

  const updateQuizResults = (results) => {
    setQuizResults(results);
  };

  return (
    <QuizContext.Provider value={{ quizResults, updateQuizResults }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 
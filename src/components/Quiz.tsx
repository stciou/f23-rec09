import React, { Component, useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  score: number;
  quizCompleted: boolean;
}

const Quiz: React.FC = () => {
  const initialQuestions: QuizQuestion[] = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
  ];
  
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    quizCompleted: false,
  });

  const quizCore = new QuizCore();

  const currentQuestion = quizCore.getCurrentQuestion();

const handleOptionSelect = (option: string): void => {
  quizCore.answerQuestion(option);
  setState((prevState) => ({ ...prevState, selectedAnswer: option }));
};

const handleButtonClick = (): void => {
  if (quizCore.hasNextQuestion()) {
    quizCore.nextQuestion();
    setState((prevState) => ({ ...prevState, currentQuestionIndex: prevState.currentQuestionIndex + 1, selectedAnswer: null }));
  } else {
    setState((prevState) => ({ ...prevState, quizCompleted: true, score: quizCore.getScore() }));
  }
};


  const { questions, currentQuestionIndex, selectedAnswer, score } = state;
  // const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;
import React, { useState, useEffect } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const quizCore = new QuizCore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  }

  const handleSubmit = (): void => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setScore(quizCore.getScore());
    }
    setQuizFinished(true);
  }

  const handleNextQuestion = (): void => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setScore(quizCore.getScore());
      setSelectedAnswer(null);
    }
    
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
    } else {
      handleSubmit();
    }
  }

  useEffect(() => {
    setCurrentQuestion(quizCore.getCurrentQuestion());
  }, [quizCore]);

  if (quizFinished) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
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

      <button onClick={handleNextQuestion}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;
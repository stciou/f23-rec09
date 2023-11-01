import React, { useState, useEffect } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [quizCore] = useState(new QuizCore());
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCurrentQuestion(quizCore.getCurrentQuestion());
  }, [quizCore]);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  }

  const handleButtonClick = (): void => {
    if (selectedAnswer !== null) {
      quizCore.answerQuestion(selectedAnswer);
      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setCurrentQuestion(quizCore.getCurrentQuestion());
        setSelectedAnswer(null);
      } else {
        setScore(quizCore.getScore());
      }
    }
  }

  if (currentQuestion === null) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score}</p>
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
  
      {quizCore.hasNextQuestion() ? (
        <button onClick={handleButtonClick}>Next Question</button>
      ) : (
        <button onClick={handleButtonClick}>Submit</button>
      )}
    </div>
  );  
};

export default Quiz;

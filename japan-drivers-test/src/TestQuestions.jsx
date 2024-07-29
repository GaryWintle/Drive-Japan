import { questions } from "./questions.js";
import { QuizButtons } from "./QuizButtons.jsx";
import { useState, useEffect } from "react";

function TestQuestions({ score, setScore }) {
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const questionLimit = 5;

  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, questionLimit));
  }, []);

  const quizButtonTrue = (questionId, answer) => {
    const question = quizQuestions.find((q) => q.id === questionId);
    const isCorrect = question.answer === answer;
    if (isCorrect) {
      console.log("You got it!");
      setScore(score + 1);
    } else {
      console.log("Incorrect");
    }

    const newAnsweredQuestions = {
      ...answeredQuestions,
      [questionId]: isCorrect,
    };
    setAnsweredQuestions(newAnsweredQuestions);

    // Check if all questions have been answered
    if (Object.keys(newAnsweredQuestions).length === quizQuestions.length) {
      setIsTestCompleted(true);
    }
  };

  return (
    <div className="question-card-container">
      {quizQuestions.map((question, index) => (
        <div key={question.id} className="question-card">
          {/* Question Number */}
          <h3 className="question-number">
            Question {index + 1} of {quizQuestions.length}
          </h3>

          {/* Question Text */}
          <p className="question-text">{question.questionText}</p>

          {/* True or False Buttons */}
          <div className="trueorfalse-buttons">
            <button
              className="true-btn"
              onClick={() => quizButtonTrue(question.id, true)}
              disabled={question.id in answeredQuestions}
            >
              True
            </button>
            <button
              className="false-btn"
              onClick={() => quizButtonTrue(question.id, false)}
              disabled={question.id in answeredQuestions}
            >
              False
            </button>
          </div>

          {/* Answer Text */}

          {isTestCompleted && !answeredQuestions[question.id] && (
            <p className="answer-text">{question.answerText}</p>
          )}
        </div>
      ))}
      {isTestCompleted && (
        <h1>
          You got {score} out of {questionLimit} right!
        </h1>
      )}
    </div>
  );
}

export default TestQuestions;

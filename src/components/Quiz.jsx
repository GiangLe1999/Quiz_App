import React, { useCallback, useState } from "react";
import questions from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";
import Summary from "./Summary";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === questions.length;

  const selectAnswerHandler = useCallback((selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const skipAnswerHandler = useCallback(
    () => selectAnswerHandler(null),
    [selectAnswerHandler]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <div id="question">
        <Question
          key={activeQuestionIndex}
          index={activeQuestionIndex}
          onSelectAnswer={selectAnswerHandler}
          onSkipAnswer={skipAnswerHandler}
        />
      </div>
    </div>
  );
};

export default Quiz;

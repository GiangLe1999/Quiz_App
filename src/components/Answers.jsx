import React, { useRef } from "react";

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  const shuffledAnswers = useRef();

  // sort sẽ edit original array, vì vậy nên ta cần tạo 1 deep copy array
  // để không ảnh hưởng đến original array
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    // sort trả về số dương thì order giữ nguyên, trả về số âm thì order sẽ bị swap
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li className="answer" key={answer}>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;

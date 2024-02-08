import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // setTimeout chỉ được kích hoạt khi dependencies thay đổi
  // Mỗi khi Quiz component re-render (do state userAnswers cập nhật) thì 1 hàm onTimeout mới cũng được tạo
  // Do đó hàm bên trong useEffect cũng được kích hoạt lại
  // Để tránh tình trạng trên, ta cần dùng useCallback để ghi nhớ value của hàm onTimeout tại component Quiz
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  // setInterval chỉ được kích hoạt khi dependencies thay đổi
  // vì dependencies chỉ là 1 mảng rỗng nên setInterval chỉ được tạo 1 lần
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
};

export default QuestionTimer;

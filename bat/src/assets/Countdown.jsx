import React, { useState, useEffect } from 'react';

const Countdown = ({ initialCountdownSeconds, onCountdownEnd, answerSubmit, start }) => {
  const [countdown, setCountdown] = useState(initialCountdownSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    // Decrease the countdown by 1 every second
    const timer = setInterval(() => {
      if (isRunning && countdown > 0 && start) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, countdown, start]);

  useEffect(() => {
    if (countdown === 0 || answerSubmit === true) {
      setIsRunning(false);
      onCountdownEnd();
    }
  }, [countdown, answerSubmit, onCountdownEnd]);

  return (
    <>
      <p className="time-num" id="2:27">{countdown === -1 ? "∞" : countdown}</p>
    </>
  );
};

export default Countdown;
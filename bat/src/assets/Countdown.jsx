import React, { useState, useEffect } from 'react';

const Countdown = ({ initialCountdownSeconds, onCountdownEnd }) => {
  const [countdown, setCountdown] = useState(initialCountdownSeconds);

  useEffect(() => {
    // Decrease the countdown by 1 every second
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
        onCountdownEnd()
        setCountdown(0)
    }
  }, [countdown, onCountdownEnd]);

  return (
    <div>
      <p>Countdown: {countdown}</p>
    </div>
  );
};

export default Countdown;
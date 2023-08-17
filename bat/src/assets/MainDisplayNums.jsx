import React from 'react';
import Countdown from './Countdown';

function MainDisplayNums({ finalNumCheck, best, finalNum, seconds, handleAnswer, displayScore }) {
  return (
    <div className="main-display-nums">
      <div className={finalNumCheck ? 'best' : 'best-hidden'}>
        <div className="best-main"></div>
        <div className="best-minor"></div>
        <p className="best-text">
          YOUR BEST
        </p>
        <p className="best-num">
          {best ? best : ''}
        </p>
      </div>
      <div className="target">
        <div className="target-main"></div>
        <div className="target-minor"></div>
        <p className="target-text">
          TARGET
        </p>
        <p className="target-num">
          {finalNumCheck ? finalNum : '???'}
        </p>
      </div>
      <div className={finalNumCheck ? 'time' : 'time-hidden'}>
        <div className="time-main"></div>
        <div className="time-minor"></div>
        <p className="time-text">
          TIME
        </p>
        <Countdown
            initialCountdownSeconds={seconds} 
            onCountdownEnd={handleAnswer} 
            answerSubmit={displayScore} 
            start={finalNumCheck} 
        />
      </div>
    </div>
  );
}

export default MainDisplayNums;
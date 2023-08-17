import React from 'react';
import Countdown from './Countdown';

function MainDisplayNums({ finalNumCheck, best, finalNum, seconds, handleAnswer, displayScore }) {
  return (
    <div className="main-display-nums" id="103:5">
      <div className={finalNumCheck ? 'best' : 'best-hidden'} id="103:2">
        <div className="best-main" id="2:14"></div>
        <div className="best-minor" id="2:15"></div>
        <p className="best-text" id="2:16">
          YOUR BEST
        </p>
        <p className="best-num" id="2:28">
          {best ? best : ''}
        </p>
      </div>
      <div className="target" id="103:3">
        <div className="target-main" id="2:4"></div>
        <div className="target-minor" id="2:6"></div>
        <p className="target-text" id="2:7">
          TARGET
        </p>
        <p className="target-num" id="2:26">
          {finalNumCheck ? finalNum : '???'}
        </p>
      </div>
      <div className={finalNumCheck ? 'time' : 'time-hidden'} id="103:4">
        <div className="time-main" id="2:17"></div>
        <div className="time-minor" id="2:18"></div>
        <p className="time-text" id="2:19">
          TIME
        </p>
        <Countdown initialCountdownSeconds={seconds} onCountdownEnd={handleAnswer} answerSubmit={displayScore} start={finalNumCheck} />
      </div>
    </div>
  );
}

export default MainDisplayNums;
import React from 'react';

function EndGame({ points, revealSolution, revealUserSolution, backBtn }) {
  return (
    <div className="end-game">
      <div className="end-solution-btns">
        <button className="end-game-solution" onClick={revealSolution}>
          Reveal Solution
        </button>
        <button className="end-game-solution" onClick={revealUserSolution}>
          Your Solution
        </button>
      </div>

      <div className="points-area">
        <p className="end-game-pr">Exact Solution is Possible!</p>
        <p className="end-game-po">{`+${points} Points`}</p>
      </div>
      <button className="back-button" onClick={backBtn}>
        Back to Menu
      </button>
    </div>
  );
}

export default EndGame;

import React from 'react';

function Operators({ handleOpe, areButtonsDisabled, handleRestart, handleUndo, handleAnswer, firstNum }) {
  const fourOpe = ['+', '-', '×', '÷'];

  const fourOpeComp = fourOpe.map((op, index) => (
    <button
      key={index}
      value={op === '×' ? '*' : op}
      onClick={(e) => handleOpe(e.target.value)}
      className={firstNum ? "four-ope" : "four-ope-disabled"}
      disabled={areButtonsDisabled}
    >
      {op}
    </button>
  ));
  console.log(firstNum)

  return (
    <div className="operators" id="103:19">
      <div className="res-undo">
        <button
          className="restart"
          id="game-undo"
          onClick={() => handleRestart()}
          disabled={areButtonsDisabled}
        >
          ⟲
        </button>
        <button
          className="delete"
          id="game-undo"
          onClick={() => handleUndo()}
          disabled={areButtonsDisabled}
        >
          ⤺
        </button>
      </div>

      <div className="ope-together">{fourOpeComp}</div>

      <button
        className="submit-btn"
        onClick={() => handleAnswer()}
        disabled={areButtonsDisabled}
      >
        ✔
      </button>
    </div>
  );
}

export default Operators;
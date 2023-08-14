import React from 'react';

function StartGame({ onStartGame }) {
  return (
    <div>
      <h1>Welcome to Bir İşlem!</h1>
      <p>You will have 30 seconds to find the number when you start the game.</p>
      <h3>When you're ready, select a mode:</h3>
      <button onClick={() => onStartGame("normal")}>
        Normal Mode
      </button>
      <button onClick={() => onStartGame("easy")}>
        Easy Mode
      </button>
    </div>
  );
}

export default StartGame;

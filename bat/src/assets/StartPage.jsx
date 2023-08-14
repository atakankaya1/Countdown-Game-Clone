import React from 'react';

function StartGame({ onStartGame, duration }) {
    //a
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
      <h3>Select countdown duration:</h3>
      <select value={30} onChange={(e) => duration(Number(e.target.value))}>
        <option value={30}>30 seconds</option>
        <option value={45}>45 seconds</option>
        <option value={60}>60 seconds</option>
        <option value={-1}>Unlimited</option>
      </select>
    </div>
  );
}

export default StartGame;

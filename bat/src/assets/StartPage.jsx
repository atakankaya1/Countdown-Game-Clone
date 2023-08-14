import React, { useState } from 'react';

function StartGame({ onStartGame, duration, iniSecond }) {
    const [custom, setCustom] = useState(false)
    function customGame(){
        setCustom(true)
    }

    const customModes = (
        <div>
            <button onClick={() => onStartGame("easy")}>
                Easy
            </button>
            <button onClick={() => onStartGame("easy")}>
                1 Large
            </button>
            <button onClick={() => onStartGame("easy")}>
                2 Large
            </button>
            <button onClick={() => onStartGame("easy")}>
                3 Large
            </button>
            <button onClick={() => onStartGame("easy")}>
                4 Large
            </button>
            <button onClick={() => onStartGame("easy")}>
                6 Small
            </button>
            <button onClick={() => onStartGame("easy")}>
                Random
            </button>
            <button onClick={() => setCustom(false)}>
                Go Back
            </button>
        </div>
    )


  return (
    <div>
      <h1>Welcome to Bir İşlem!</h1>
      <p>You can play original Countdown game or customize your gameplay!</p>
      <h3>When you're ready, select a mode:</h3>
      {!custom ? (
                <div>
                    <button onClick={() => onStartGame("normal")}>
                        Classic Mode
                    </button>
                    <button onClick={customGame}>
                        Customize
                    </button>
                </div>
            ) : (
                customModes
            )}
      
      
      <h3>Select countdown duration:</h3>
      <select value={iniSecond} onChange={(e) => duration(Number(e.target.value))}>
        <option value={30}>30 seconds</option>
        <option value={45}>45 seconds</option>
        <option value={60}>60 seconds</option>
        <option value={-1}>Unlimited</option>
      </select>
    </div>
  );
}

export default StartGame;

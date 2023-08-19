import React, { useState } from 'react'

function StartGame({ onStartGame, duration, iniSecond }) {
    const [custom, setCustom] = useState(false)
    function customGame(){
        setCustom(true)
    }

    const customModes = (
        <div className="mode-select">
            <button className="mode-btn" onClick={() => onStartGame("easy")}>
                Easy
            </button>
            <button className="mode-btn" onClick={() => onStartGame("easy")}>
                1 Large
            </button>
            <button className="mode-btn" onClick={() => onStartGame("easy")}>
                2 Large
            </button>
            <button className="mode-btn" onClick={() => onStartGame("easy")}>
                3 Large
            </button>
            <button className="mode-btn" onClick={() => onStartGame("easy")}>
                4 Large
            </button>
            <button className="mode-btn" onClick={() => onStartGame("easy")}>
                6 Small
            </button>
            <button className="mode-btn" onClick={() => onStartGame("easy")}>
                Random
            </button>
            <button className="mode-btn" id="back" onClick={() => setCustom(false)}>
                Go Back
            </button>
        </div>
    )


  return (
    <div className="start-main">
      <h1>Welcome to Countdown</h1>
      <h3>When you're ready, select a mode:</h3>
      {!custom ? (
                <div className="mode-select">
                    <button className="mode-btn" onClick={() => onStartGame("normal")}>
                        Classic Mode
                    </button>
                    <button className="mode-btn" onClick={customGame}>
                        Customize
                    </button>
                </div>
            ) : (
                customModes
            )}
      
      
      <h3>Select countdown duration:</h3>
      <div className='select'>
        <select  value={iniSecond} onChange={(e) => duration(Number(e.target.value))}>
            <option value={30}>30 seconds</option>
            <option value={45}>45 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={-1}>Unlimited</option>
        </select>
      </div>

      
      
    </div>
  )
}

export default StartGame

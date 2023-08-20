import React from 'react'

function StartGame({ duration, iniSecond, rounds, startBtn }) {


    const roundsSelect = (
        <div className="mode-select">
            <button className="mode-btn" onClick={() => rounds(1)}>
                1 Round
            </button>
            <button className="mode-btn" onClick={() => rounds(3)}>
                3 Rounds
            </button><button className="mode-btn" onClick={() => rounds(5)}>
                5 Rounds
            </button><button className="mode-btn" onClick={() => rounds(10)}>
                10 Rounds
            </button>
        </div>
    )


  return (
    <div className="start-main">
      <h1>Welcome to Countdown</h1>
      <h3>When you're ready, select a mode:</h3>
        {roundsSelect}
      <h3>Select countdown duration:</h3>
      <div className='select'>
        <select  value={iniSecond} onChange={(e) => duration(Number(e.target.value))}>
            <option value={30}>30 seconds</option>
            <option value={45}>45 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={-1}>Unlimited</option>
        </select>
      </div>

      <button onClick={startBtn}>Start</button>

      
      
    </div>
  )
}

export default StartGame

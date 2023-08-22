import React, { useState } from 'react'

function StartGame({ duration, iniSecond, rounds, startBtn }) {

    

  const [selectedRound, setSelectedRound] = useState(1);

  const roundButtons = [1, 3, 5, 10].map((round) => (
      <button
          key={round}
          className={`round-btn ${selectedRound === round ? 'disabled' : ''}`}
          onClick={() => {
              rounds(round);
              setSelectedRound(round);
          }}
          disabled={selectedRound === round}
      >
          {round} Round{round !== 1 ? 's' : ''}
      </button>
  ));


  return (
    <div className="start-main">
      <h1>Welcome to Countdown</h1>
      <h3>When you're ready, select number of rounds:</h3>
      <div className='mode-select'>
        {roundButtons}
      </div>
      <h3>Select countdown duration:</h3>
      <div className='select'>
        <select  value={iniSecond} onChange={(e) => duration(Number(e.target.value))}>
            <option value={30}>30 seconds</option>
            <option value={45}>45 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={-1}>Unlimited</option>
        </select>
      </div>

      <button className='start-btn' onClick={startBtn}>Start</button>

      
      
    </div>
  )
}

export default StartGame

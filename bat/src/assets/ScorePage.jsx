import React from 'react'

function ScorePage({ main, points, rounds, duration }) {
  return (
    <div className="score-page-container">
     <h2>You finished the {rounds} {rounds === 1 ? "round" : "rounds"}</h2>
     <h3>Selected Duration: {duration !== -1 ? duration+" seconds" : "unlimited"}</h3>
     <p>Your total points: {points} / {rounds*10}</p>
     <button onClick={main}>Go back</button>
    </div>
  )
}

export default ScorePage
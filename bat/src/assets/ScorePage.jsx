import React from 'react'

function ScorePage({ main, points, rounds }) {
  return (
    <div className="score-page-container">
     <h2>You finished the {rounds} {rounds === 1 ? "round" : "rounds"}</h2>
     <p>Your total points: {points} / {rounds*10}</p>
     <button onClick={main}>Go back</button>
    </div>
  )
}

export default ScorePage
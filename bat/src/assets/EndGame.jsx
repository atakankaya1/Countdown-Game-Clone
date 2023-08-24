import React from 'react'

function EndGame({ points, revealSolution, revealUserSolution, backBtn, gameInProgress, handleRound, currentRound, maxRounds }) {
  //points-area kullanılmıyor CSS
  return (
    <div className="end-game">
      <div className={points===10 ? "end-solution-btns-hidden" : "end-solution-btns"}>
        <button className="end-game-solution" onClick={revealSolution}>
          Possible Solution
        </button>
        <button className="end-game-solution" onClick={revealUserSolution}>
          Your Solution
        </button>
      </div>
    

      <div className="points-area">
        {points===10 ?
        <>
          <p className="end-game-pr">Congratulations!</p>
          <p className="end-game-po">{`+${points} Points`}</p> 
        </>:
        <>
          <p className="end-game-pr">Exact Solution was Possible!</p>
          <p className="end-game-po">{`+${points} Points`}</p>
        </>
      }
        
      </div>
      {gameInProgress ?
      <div className="end-next-btns">
        <button className="back-button" onClick={backBtn}>
            Quit Round
        </button>
        <button className="back-button" onClick={handleRound}>
            {currentRound === maxRounds ? "Finish Round" : "Next Round"}
        </button>
      </div> : 
      <button className="back-button" onClick={backBtn}>
        Back to Menu
      </button>
    }
      
    </div>
  )
}

export default EndGame

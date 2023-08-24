import React from 'react'

function ScorePage({ main, points, rounds, duration, userInfo }) {

/*
best: 479
​​
currentRound: 1
​​
finalNum: 480
​​
numbers: Array(6) [ 4, 5, 5, … ]
​​
points: 7
*/


  const gameHist = Object.keys(userInfo).map((index)=>{
    const user = userInfo[index]
    const userNumbers= userInfo[index].numbers.map(function(num){
      return ` ${num}`
    })
    return <div key={index}>
              <p >{`${user.currentRound}. Round = Target: ${user.finalNum}, Numbers: (${userNumbers}), Your Best: ${user.best}, Points: +${user.points}`}</p>
            </div>
  })




  return (
    <div className="score-page-container">
     <h2>You finished the {rounds} {rounds === 1 ? "round" : "rounds"}</h2>
     <h3>Selected Duration: {duration !== -1 ? duration+" seconds" : "unlimited"}</h3>
     <div className='userInfo'>
      {gameHist}
     </div>
     <p className='score-page-animated'>Your total points: {points} / {rounds*10}</p>
     <button onClick={main}>Go back</button>
    </div>
  )
}

export default ScorePage
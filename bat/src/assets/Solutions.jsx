import React from 'react'

function Solutions({ solutionShow, bestSolution, solutionUserShow, userOperations }) {
  return (
    <div className="solutions">
      <div className={solutionShow ? "solution" : "solution-hidden"}>
        <p className='sol-pr'>Solution</p>
        {bestSolution}
      </div>
      <div className={solutionUserShow ? "solution" : "solution-hidden"}>
        <p className='sol-pr'>Your Solution</p>
        <div className='solution-display'>
          {userOperations}
        </div>
      </div>
    </div>
  )
}

export default Solutions

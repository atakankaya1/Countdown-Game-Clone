import React from 'react'

function PickNumber({ onStartGame, backBtn}) {

    const customModes = (
        <div className="mode-select">
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
            <button className="mode-btn" id="back" onClick={() => backBtn()}>
                Go Back
            </button>
        </div>
    )


  return (
    <div className="pick-number"> 
        <h2>Pick Numbers</h2>
        {customModes}   
    </div>
  )
}

export default PickNumber

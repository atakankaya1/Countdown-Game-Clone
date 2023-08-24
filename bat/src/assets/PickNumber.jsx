import React from 'react'

function PickNumber({ onStartGame, backBtn}) {

    const customModes = (
        <div className="mode-select">
            <button className="mode-btn" onClick={() => onStartGame("1")}>
                1 Large
            </button>
            <button className="mode-btn" onClick={() => onStartGame("2")}>
                2 Large
            </button>
            <button className="mode-btn" onClick={() => onStartGame("3")}>
                3 Large
            </button>
            <button className="mode-btn" onClick={() => onStartGame("4")}>
                4 Large
            </button>
            <button className="mode-btn" onClick={() => onStartGame("0")}>
                6 Small
            </button>
            <button className="mode-btn" onClick={() => onStartGame(`${Math.floor(Math.random() * 5)}`)}>
                Random
            </button>
            <button className="mode-btn" id="back" onClick={() => backBtn()}>
                Quit Round
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

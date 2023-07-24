import { useState, useEffect } from 'react'
import Countdown from './assets/Countdown'
const BASE_HOST = "http://localhost:8080/api/game"


// sıfırı bir sayıya bölünce saçmalıyor.





import './App.css'

function App() {
  
  const [start, setStart] = useState(false)
  const [firstNum, setFirstNum] = useState("")
  const [secondNum, setSecondNum] = useState("")
  const [ope, setOpe] = useState("")
  const [operations, setOperations] = useState([])
  const [finalNum, setFinalNum] = useState("")
  const [nums, setNums] = useState({})
  const [originalNums, setOriginalNums] = useState({})
  const [score, setScore] = useState()
  const [displayScore, setDisplayScore] = useState(false)
  const [firstNumIndex, setFirstNumIndex] = useState()
  const [secondNumIndex, setSecondNumIndex] = useState()
  const [solution, setSolution] = useState([])
  const [solutionShow, setSolutionShow] = useState(false)
  const [exactSolution, setExactSolution] = useState(true)
  
  
  //fetch Request
  useEffect(()=>{
    fetch(BASE_HOST)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      setFinalNum(data.target)
      const requestedNumbers = data.numbers.map(function(n){
        return {value: n,
                isEnabled: true}
      })
      setNums(requestedNumbers)
      setOriginalNums(requestedNumbers)
      setSolution(data.bestSolution)
      if(!data.isSolutionExact){
        setExactSolution(!exactSolution)
      }

    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
  }, [exactSolution])
   
  //functions

  function result(firstNumber, operator, secondNumber) {
    if (operator === "+") {
      return +firstNumber + +secondNumber
    } else if (operator === "-") {
      if (firstNumber <= secondNumber) {
        return secondNumber - firstNumber
      } else {
        return firstNumber - secondNumber
      }
    } else if (operator === "*") {
      return firstNumber * secondNumber
    } else {
      if (firstNumber % secondNumber !== 0) {
        return false
      } else {
        return firstNumber / secondNumber
      }
    }
  }

  function handleCalculate() {
    const calculatedResult = result(firstNum, ope, secondNum)
  if(firstNum){
    if (calculatedResult !== false) {
      const operation = {
        firstNum,
        ope,
        secondNum,
        count: calculatedResult,
      }
      setNums((prevNums) => {
        const newIndex = Object.keys(prevNums).length
        return {
          ...prevNums,
          [newIndex]: { value: calculatedResult, isEnabled: true },
        }
      })
      setOperations((prevOperations) => [...prevOperations, operation])
      setFirstNum("")
      setOpe("")
      setSecondNum("")
    } else {
      setFirstNum("")
      setOpe("")
      setSecondNum("")
      setNums((prevNums) => {
        const updatedNums = { ...prevNums }
        updatedNums[firstNumIndex] = { ...updatedNums[firstNumIndex], isEnabled: true }
        return updatedNums
      })
      setNums((prevNums) => {
        const updatedNums = { ...prevNums }
        updatedNums[secondNumIndex] = { ...updatedNums[secondNumIndex], isEnabled: true }
        return updatedNums
      })
    }
  }
    
  }

  function handleNumClick(value, index) {
    if (firstNum === "") {
      setFirstNum(value)
      setFirstNumIndex(index)
      setSecondNum("")
    } else if(firstNum && !ope){
      setNums((prevNums) => {
        const updatedNums = { ...prevNums }
        updatedNums[firstNumIndex] = { ...updatedNums[firstNumIndex], isEnabled: true }
        return updatedNums
      })
      setFirstNum(value)
      setFirstNumIndex(index)
      setSecondNum("")
    }else if (ope !== "") {
      setSecondNumIndex(index)
      setSecondNum(value)
    } else {
      setFirstNum(value)
    }
  
    setNums((prevNums) => {
      const updatedNums = { ...prevNums }
      updatedNums[index] = { ...updatedNums[index], isEnabled: false }
      return updatedNums
    })
  }
 

  function handleDelete(){
    if(firstNum && ope && secondNum){
      setSecondNum("")
      setNums((prevNums) => {
        const updatedNums = { ...prevNums }
        updatedNums[secondNumIndex] = { ...updatedNums[secondNumIndex], isEnabled: true }
        return updatedNums
      })
      setSecondNumIndex(null)
    } else if(firstNum && ope){
      setOpe("")
    } else if (firstNum){
      setFirstNum("")
      setNums((prevNums) => {
        const updatedNums = { ...prevNums }
        updatedNums[firstNumIndex] = { ...updatedNums[firstNumIndex], isEnabled: true }
        return updatedNums
      })
      setFirstNumIndex(null)
    }
  }

  function handleRestart(){
    setFirstNum("")
    setSecondNum("")
    setOpe("")
    setOperations([])
    setNums(originalNums)
    
    
    setDisplayScore(false)
  }
  
  function handleAnswer() {
    const finalCount = operations.slice(-1)
  
    if (finalCount.length > 0) {
      const score = Number(finalNum) - Number(finalCount[0].count)
      setScore(Math.abs(score))
    } else {
      // If no operations are made, set the score to the maximum possible value
      const maxScore = Number(finalNum)
      setScore(maxScore)
    }
  
    setDisplayScore(true)
  }

  function showSolution(){
    setSolutionShow(!solutionShow)
  }



  //Numbers and Operation

  
  const initialNums = Object.keys(nums).map((index) => {
    const num = nums[index]
    return (
      <button
        key={index}
        value={num.value}
        onClick={() => handleNumClick(num.value, index)}
        disabled={!num.isEnabled}
        className='numberButtons'
      >
        {num.value}
      </button>
    )
  })

  const displayOperation =  operations.map((operation, index) => (
    <div key={index} className="operation">
      <p>
        {`${operation.firstNum} ${operation.ope} ${operation.secondNum} = ${operation.count}`}
      </p>
    </div>
  ))

  const fourOpe = ["+","-","/","*"]

  const fourOpeComp = fourOpe.map((op,index) => (
  <button 
    key={index} 
    value={op} 
    onClick={e => setOpe(e.target.value)}
    className='operator'
    >
      {op}
    </button>)
  )

  const textWin = "You Win!!"

  const bestSolution = solution.map(function(sol, index){
    return <p key={index}>{sol}</p>
  })

  const startGame = (
      <div>
        <h1>Welcome to Bir İşlem!</h1>
        <p>You will have 30 seconds to find the number when you start the game.</p>
        <h3>When you ready, start the game!</h3>
        <button onClick={()=>setStart(true)}>Start Game</button>
      </div>
    )
  

  return (
    <>
      
      {!start ?
      startGame :
      <div className='card'>
        <h3>Bir İşlem</h3>
        <div className='target'>
          <h2>Number to Win: {finalNum}</h2>
          <div className='countdown'>
            <Countdown initialCountdownSeconds={60} onCountdownEnd={handleAnswer} answerSubmit={displayScore} />
          </div>
        </div>
        <div className='allOpe'>
          <div className='numsOpe'>
            <div>
              <h2>Numbers</h2>
              <div className='numButtons'>
                {initialNums}
              </div>
            </div>
            <div>
              <h2>Operators</h2>
              <div className='operators'>
                {fourOpeComp}
                <button className="equal" onClick={()=>handleCalculate()}>=</button>
                <button className="delete" onClick={()=>handleDelete()}>Del</button>
                <button className="restart" onClick={()=>handleRestart()}>Res</button>
              </div>
            </div>
          
          </div>
          <div>
            <div>
              <h2 className='currentOperation'>Display: {ope ? firstNum+ope+secondNum : firstNum} </h2>
            </div>
            <div className='operations'>
              <h2>Operations : {displayOperation} </h2>
            </div>
          </div>
        </div>
        
        <div className='submit'>
          <div>
            <button onClick={()=>handleAnswer()}>Submit Answer</button>
          </div>
          {displayScore ?
          <div>
            <p>{score===0 ? textWin : `You are close to the target ${score} points`}</p>
            <button onClick={()=>showSolution()}>Show Solution</button>
            {solutionShow ? 
            <div className='solution'>
              <p>{bestSolution}</p>
            </div>
             :
            <div></div>
            }
          </div> :
          <div>

          </div>
          }
        </div>
        
        

       
      </div>
        }
        
      
      
      
    </>
  )
}

export default App
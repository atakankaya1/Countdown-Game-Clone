import { useState, useEffect } from 'react'
import Countdown from './assets/Countdown'
import logo from "./assets/countdown-log.png"

const BASE_HOST = "http://localhost:8080/api/game"

// UNDO eklenmesi lazım
// sıfırı bir sayıya bölünce saçmalıyor.
// küçük sayıdan büyük sayı çıkınca display ekranına düzgün yansıt --> uyarı yazısı çıkarmak daha mantıklı
// operations ve solution altında çok boşluk var
// show solution bölümü kendini tekar ediyor
// üst kısım düzelsin
// dark mode


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
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false)
  const [showResult, setShowResult] = useState(false);
  
  
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
        
        return  secondNumber - firstNumber
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
        return {
          ...prevNums,
          [secondNumIndex]: { value: calculatedResult, isEnabled: true },
        }
      })
      setNums((prevNums) => {
        return {
          ...prevNums,
          [firstNumIndex]: { value: 0, isEnabled: true },
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
      setFirstNum(value);
      setFirstNumIndex(index);
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[index] = { ...updatedNums[index], isEnabled: false };
        return updatedNums;
      });
    } else if (firstNum && !ope) {
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[firstNumIndex] = {
          ...updatedNums[firstNumIndex],
          isEnabled: true,
        };
        return updatedNums;
      });
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[index] = { ...updatedNums[index], isEnabled: false };
        return updatedNums;
      });
      setFirstNum(value);
      setFirstNumIndex(index);
      setSecondNum("");
      setShowResult(false); // Reset showResult when selecting a new first number
    } else if (ope) {
      setSecondNum(value);
      setSecondNumIndex(index);
      setShowResult(true); // Show the result on the second number button
    }
  }
  useEffect(() => {
    if (firstNum && ope && secondNum && showResult) {
      handleCalculate();
    }
  }, [secondNum, ope, showResult]);
  
 

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
    setAreButtonsDisabled(true)
    setFirstNum("")
    setOpe("")
    setSecondNum("")
    
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
        disabled={!num.isEnabled || areButtonsDisabled}
        className={num.isEnabled ? 'numberButtons' : 'disabled-button'}
      >
        {num.value == 0 ? "" : num.value}
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
    disabled={areButtonsDisabled}
    >
      {op}
    </button>)
  )

  const textWin = "You Win!!"

  const bestSolution = solution.map(function(sol, index){
    return <div key={index} className='everySol'> 
              <p >{sol}</p>
          </div>
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
        <div className='logo'>
          <img src={logo} alt="Countdown" />
        </div>
        <div className='indicators'>
          <h2 className='target'>Number to Win: {finalNum}</h2>
          
          <div className='countdown'>
            <Countdown initialCountdownSeconds={3000} onCountdownEnd={handleAnswer} answerSubmit={displayScore} />
          </div>
        </div>
        {displayScore ? 
          <p className='score'>{score===0 ? textWin : `You are close to the target ${score} points`}</p>:
          <p></p>}
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
                <div>
                  <button
                    className="delete" 
                    onClick={()=>handleDelete()}
                    disabled={areButtonsDisabled}>Del</button>
                  <button 
                    className="restart" 
                    onClick={()=>handleRestart()}
                    disabled={areButtonsDisabled}>Res</button>
                </div>
              </div>
            </div>
            <div className='answer'>
                    {!displayScore ?
                    <button onClick={()=>handleAnswer()}>Submit Answer</button>:
                    <button onClick={()=>showSolution()}>Show Solution</button>
                    }
            </div>
          </div>
          <div className='rightOpe'>
            <div className='currentOperation'>
              <h2 >{ope ? firstNum+ope+secondNum : firstNum} </h2>
            </div>
            <div className='endOpe'>
              {!areButtonsDisabled ?
                <div className='operations'>
                  <h3>Operations :</h3>
                  <p> {displayOperation} </p>
                </div> : !solutionShow ?
                <div className='operations'>
                  <h3>Operations :</h3>
                  <p> {displayOperation} </p>
                </div> : 
                <>
                <div className='operations'>
                  <h3>Operations :</h3>
                  <p> {displayOperation} </p>
                </div>
                <div className='solution'>
                  <h3>Solution:</h3>
                  <p> {bestSolution}</p>
                </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
        }
        
      
      
      
    </>
  )
}

export default App
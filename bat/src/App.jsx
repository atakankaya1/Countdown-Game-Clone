import { useState, useEffect } from 'react'
import Countdown from './assets/Countdown'
import logo from "./assets/countdown-log.png"

const BASE_HOST = "http://localhost:8080/api/game"

// UNDO butonu ekle
// sayıların tek tek animasyonla gelmesini sağla, countdown ona göre başlasın

// background color için bir div ve class ekle
// sayıya ulaşınca oyunu bitir
// tek sayı kalınca best score'a kaydet (bitmediyse)
// (optional) kullanıcı zaman limitini kendi belirlesin
// oyun bitince showSolution ve your solution
// dark mode

// UNDO bir önceki num operasyonunu getiriyor ve getirdiğinde ilk num disabled şeklinde oluyor.

// sıfırı bir sayıya bölünce saçmalıyor.
// küçük sayıdan büyük sayı çıkınca display ekranına düzgün yansıt --> uyarı yazısı çıkarmak daha mantıklı
// üstteki not için: ya da işlemi yapma ve bütün butonlar bir süreliğine kırmızı yansın.
// show solution bölümü kendini tekar ediyor
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
  const [previousOperations, setPreviousOperations] = useState([])
  const [previousNums, SetPreviousNums] = useState({})
  const [selectedMode, setSelectedMode] = useState("normal")
  
  
  
  //fetch Request
  useEffect(() => {
    if (start) {
      const fetchUrl = selectedMode === "easy" ? `${BASE_HOST}/easy` : BASE_HOST;
  
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setFinalNum(data.target);
          const requestedNumbers = data.numbers.map((n) => ({
            value: n,
            isEnabled: true,
          }));
          setNums(requestedNumbers);
          setOriginalNums(requestedNumbers);
          setSolution(data.bestSolution);
          if (!data.isSolutionExact) {
            setExactSolution(!exactSolution);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [start, selectedMode, exactSolution]);
   
  //functions

  function handleModeChange(mode) {
    setSelectedMode(mode);
  }

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
      setPreviousOperations((prev) => [...prev, {...operation}])
      SetPreviousNums({...nums})
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
  
  function handleUndo() {
    if (previousOperations.length > 0) {
      setOperations((prevOperations) => prevOperations.slice(0, -1));
      setNums({ ...previousNums });
      setPreviousOperations((prevOperations) => prevOperations.slice(0, -1));
    }


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
        className={num.isEnabled ? 'num-box' : 'num-box-disabled'}
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
    className='add'
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
          <h3>When you're ready, select a mode:</h3>
          <button onClick={() => { setStart(true); setSelectedMode("normal"); }}>
            Normal Mode
          </button>
          <button onClick={() => { setStart(true); setSelectedMode("easy"); }}>
            Easy Mode
          </button>
      </div>
    )

  const modeSelection = (
    <>
      <button onClick={() => handleModeChange("normal")}>Normal Mode</button>
      <button onClick={() => handleModeChange("easy")}>Easy Mode</button>
    </>
  )
    
    
  //<button onClick={() => handleModeChange("normal")}>Normal Mode</button>
//<button onClick={() => handleModeChange("easy")}>Easy Mode</button>

  return (
    <>
      
      {!start ?
      startGame :
      <div class="main" id="105:21">
        <div class="all-nums-display" id="PXYfpuCMhfZNgFU4fX9q7V">
          <div class="main-display" id="103:20">
            <img class="logo" src={logo} id="1:2"/>
            <div class="main-display-nums" id="103:5">
              <div class="best" id="103:2">
                <div class="best-main" id="2:14"></div>
                <div class="best-minor" id="2:15"></div>
                <p class="best-text" id="2:16">YOUR BEST</p>
                <p class="best-num" id="2:28">220</p>
              </div>
              <div class="target" id="103:3">
                <div class="target-main" id="2:4"></div>
                <div class="target-minor" id="2:6"></div>
                <p class="target-text" id="2:7">TARGET</p>
                <p class="target-num" id="2:26">{finalNum}</p>
              </div>
              <div class="time" id="103:4">
                <div class="time-main" id="2:17"></div>
                <div class="time-minor" id="2:18"></div>
                <p class="time-text" id="2:19">TIME</p>
                <Countdown initialCountdownSeconds={3000} onCountdownEnd={handleAnswer} answerSubmit={displayScore} />
              </div>
            </div>
          </div>
          <div class="numbers" id="103:12">
            {initialNums}
          </div>
        </div>
        <div class="operators" id="103:19">
          <button 
            className="restart" 
            onClick={()=>handleRestart()}
            disabled={areButtonsDisabled}>
          Res
          </button>
          <div class="ope-together">
            {fourOpeComp}
          </div>
          <button 
            className="delete" 
            onClick={()=>handleDelete()} 
            disabled={areButtonsDisabled}>
          Del
          </button>
        </div>
      </div>
        }
    </>
  )
}

export default App
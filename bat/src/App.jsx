import { useState, useEffect } from 'react'
import Countdown from './assets/Countdown'
import StartGame from "./assets/StartPage"
import NumbersComponent from './assets/NumbersComponent'
import logo from "./assets/countdown-log.png"

const BASE_HOST = "http://localhost:8080/api/game"



// dark mode


// küçük sayıdan büyük sayı çıkınca display ekranına düzgün yansıt --> uyarı yazısı çıkarmak daha mantıklı
// üstteki not için: ya da işlemi yapma ve bütün butonlar bir süreliğine kırmızı yansın.




import './App.css'

function App() {
  
  const [start, setStart] = useState(false)
  const [firstNum, setFirstNum] = useState("")
  const [secondNum, setSecondNum] = useState("")
  const [ope, setOpe] = useState("")
  const [operations, setOperations] = useState([])
  const [finalNum, setFinalNum] = useState("")
  const [finalNumCheck, setFinalNumCheck] = useState(false)
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
  const [numHistory, setNumHistory] = useState([])
  const [best, setBest] = useState()
  const [points, setPoints] = useState(0)
  const [seconds, SetSeconds] = useState(30)

  function backBtn(){
    setSolutionShow(false)
    setDisplayScore(false)
    setExactSolution(true)
    setStart(false)
    setFinalNumCheck(false)
    setFinalNum("")
    setOriginalNums({})
    setNums({})
    setNumHistory([])
    setBest()
    setPoints(0)
    setShowResult(false)
    setSolution([])
    setScore()
    setNumHistory([])
    setAreButtonsDisabled(false)
  }
 

  
  
  
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
          const requestedNumbers = data.numbers.map((n, index) => ({
            value: n,
            isEnabled: true,
            delay: (index+1)*750,
            show:false
          }));

          const requestedNumbersRes = data.numbers.map((n, index) => ({
            value: n,
            isEnabled: true,
            delay: 0,
            show:true
          }));

          setTimeout(() => {
            setFinalNumCheck(true)
          }, 5500)
          setNums(requestedNumbers);
          setOriginalNums(requestedNumbersRes);
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

  /* if we want score to be display when there is only one number left.
  useEffect(() => {
    const availableNumbers = Object.values(nums).filter(num => num.value != 0);
    if (availableNumbers.length === 1) {
      handleAnswer();
    }
  }, [nums]);
  */

   
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
      setNumHistory((prevNumHistory) => [...prevNumHistory, nums]);
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

 
  function handleUndo() {
    if (numHistory.length > 0) {
      const newNumHistory = [...numHistory]
      setNumHistory(newNumHistory.slice(0,-1))
      const previousNumsState = newNumHistory.pop()
      const updatedNums = {...previousNumsState}
      Object.keys(updatedNums).forEach((index) => {
        updatedNums[index] = { ...updatedNums[index], isEnabled: true };
      })
      setNums(updatedNums);
    }
  }

  function handleNumClick(value, index) {
    if (firstNum === "" && value != 0) {
      setFirstNum(value);
      setFirstNumIndex(index);
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[index] = { ...updatedNums[index], isEnabled: false};
        return updatedNums;
      });
    } else if (firstNum && !ope && value != 0) {
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
    } else if (ope && value != 0) {
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
  

  function handleRestart(){
   setNums(originalNums)
   setNumHistory([])
    setFirstNum("")
    setSecondNum("")
    setOpe("")
    setOperations([])
   
    
    
    setDisplayScore(false)
  }
  
  function handleAnswer() {
    const availableNumbers = Object.values(nums).filter(num => num.value != 0);

  if (availableNumbers.length > 0) {
    // Find the nearest number to the target number
    const nearestNumber = availableNumbers.reduce((closest, num) => {
      const diff1 = Math.abs(finalNum - num.value);
      const diff2 = Math.abs(finalNum - closest.value);
      return diff1 < diff2 ? num : closest;
    });

    const score = Math.abs(finalNum - nearestNumber.value);
    setScore(score);
    setBest(nearestNumber.value)
    if(score === 0){
      setPoints(10)
    } else if(score > 0 && score <= 5){
      setPoints(7)
    } else if(score > 5 && score <=10 ){
      setPoints(5)
    } else {
      setPoints(0)
    }
    
  } else {
    // If no numbers left, calculate score based on the last remaining number
    const lastRemainingNumber = Object.values(nums).find(num => num.value !== 0);
    if (lastRemainingNumber) {
      const score = Math.abs(finalNum - lastRemainingNumber.value);
      setScore(score);
      setBest(lastRemainingNumber.value)
      if(score === 0){
        setPoints(10)
      } else if(score > 0 && score <= 5){
        setPoints(7)
      } else if(score > 5 && score <=10 ){
        setPoints(5)
      } else {
        setPoints(0)
      }
      
    } else {
      // In case of unexpected scenario where there are no numbers left, set score to 0
      setScore(0);
    }
  }

  setDisplayScore(true);
  setAreButtonsDisabled(true);
  setFirstNum("");
  setOpe("");
  setSecondNum("");
    
  }

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


  const bestSolution = solution.map(function(sol, index){
    return <div key={index} className='everySol'> 
              <p >{sol}</p>
          </div>
  })
  function handleStartGame(mode) {
    setSelectedMode(mode);
    setStart(true);
    
  }
  function handleStartSeconds(duration){
    SetSeconds(duration)
  }

  function revealSolution(){
    if(score || score===0){
      setSolutionShow(!solutionShow)
    }
  }
  

  return (
    <>
      
      {!start ?
       <StartGame onStartGame={handleStartGame} duration={handleStartSeconds} iniSecond={seconds} /> :
      <div className="main" id="105:21">
        <div className={solutionShow ? "solution" : "solution-hidden"}>{bestSolution}</div>
        <div className="all-nums-display" id="PXYfpuCMhfZNgFU4fX9q7V">
          <div className="main-display" id="103:20">
            <img className="logo" src={logo} id="1:2"/>
            <div className="main-display-nums" id="103:5">
              <div className={finalNumCheck ? "best" : "best-hidden"} id="103:2">
                <div className="best-main" id="2:14"></div>
                <div className="best-minor" id="2:15"></div>
                <p className="best-text" id="2:16">YOUR BEST</p>
                <p className="best-num" id="2:28">{best ? best : ""}</p>
              </div>
              <div className="target" id="103:3">
                <div className="target-main" id="2:4"></div>
                <div className="target-minor" id="2:6"></div>
                <p className="target-text" id="2:7">TARGET</p>
                <p className="target-num" id="2:26">{finalNumCheck ? finalNum : "???"}</p>
              </div>
              <div className={finalNumCheck ? "time" : "time-hidden"} id="103:4">
                <div className="time-main" id="2:17"></div>
                <div className="time-minor" id="2:18"></div>
                <p className="time-text" id="2:19">TIME</p>
                <Countdown initialCountdownSeconds={seconds} onCountdownEnd={handleAnswer} answerSubmit={displayScore} start={finalNumCheck} />
              </div>
            </div>
          </div>
          <div className="numbers" id="103:12">
          <NumbersComponent
            nums={nums}
            setNums={setNums}
            handleNumClick={handleNumClick}
            areButtonsDisabled={areButtonsDisabled}
            finalNumCheck={finalNumCheck}
          />
          </div>
        </div>
          {(score || score ===0) ? 
            <div className="end-game">
              <button className="end-game-solution" onClick={()=>revealSolution()}>Reveal Solution</button>
                <div className="points-area">
                  <p className="end-game-pr">Exact Solution is Possible!</p>
                  <p className="end-game-po">{`+${points} Points`}</p>
                </div>
              <button className="back-button" onClick={()=>backBtn()}>Back to Menu</button>
            </div>:
            
          <div className="operators" id="103:19">
            <div className='res-undo'>
              <button 
                className="restart" 
                onClick={()=>handleRestart()}
                disabled={areButtonsDisabled}>
                Res
              </button>
              <button 
                className="delete" 
                onClick={()=>handleUndo()} 
                disabled={areButtonsDisabled}>
                Undo
              </button>
            </div>
         
          <div className="ope-together">
            {fourOpeComp}
          </div>
          
          <button 
            className="delete" 
            onClick={()=>handleAnswer()} 
            disabled={areButtonsDisabled}>
          Submit
          </button>
          </div>
            
          }
         
        </div>
      
        }
    </>
  )
}

export default App
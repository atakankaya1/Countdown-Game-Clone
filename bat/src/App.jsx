import { useState, useEffect } from 'react'
import Countdown from './assets/Countdown'
import logo from "./assets/countdown-log.png"

const BASE_HOST = "http://localhost:8080/api/game"


// sayıya ulaşınca oyunu bitir
// tek sayı kalınca best score'a kaydet (bitmediyse)

// (optional) kullanıcı zaman limitini kendi belirlesin

// background color için bir div ve class ekle
// oyun bitince showSolution ve your solution
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
            delay: (index+1)*1000,
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
          }, 7000)
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
  

  
  
 
/*

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

*/
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
    const num = nums[index];
    
    let classNames = num.isEnabled ? 'num-box' : 'num-box-disabled'
  

    setTimeout(() => {
      setNums((prevNums) => {
        const updatedNums = { ...prevNums }
        updatedNums[index] = { ...updatedNums[index], show:true }
        return updatedNums
      })
    }, num.delay)
    

    return (
      <button
        key={index}
        value={num.value}
        onClick={() => handleNumClick(num.value, index)}
        disabled={!num.isEnabled || areButtonsDisabled || !finalNumCheck}
        className={num.value === 0 ? `${classNames} num-box-noCursor` : classNames}
      >
        {num.value === 0 ? '' : num.show ? num.value : "?"}
      </button>
    );
  });

  /*
  const displayOperation =  operations.map((operation, index) => (
    <div key={index} className="operation">
      <p>
        {`${operation.firstNum} ${operation.ope} ${operation.secondNum} = ${operation.count}`}
      </p>
    </div>
  ))
  */

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

  /*
  const modeSelection = (
    <>
      <button onClick={() => handleModeChange("normal")}>Normal Mode</button>
      <button onClick={() => handleModeChange("easy")}>Easy Mode</button>
    </>
  )
  */

 

  
    
    
  //<button onClick={() => handleModeChange("normal")}>Normal Mode</button>
//<button onClick={() => handleModeChange("easy")}>Easy Mode</button>

  return (
    <>
      
      {!start ?
      startGame :
      <div className="main" id="105:21">
        <div className="all-nums-display" id="PXYfpuCMhfZNgFU4fX9q7V">
          <div className="main-display" id="103:20">
            <img className="logo" src={logo} id="1:2"/>
            <div className="main-display-nums" id="103:5">
              <div className="best" id="103:2">
                <div className="best-main" id="2:14"></div>
                <div className="best-minor" id="2:15"></div>
                <p className="best-text" id="2:16">YOUR BEST</p>
                <p className="best-num" id="2:28">220</p>
              </div>
              <div className="target" id="103:3">
                <div className="target-main" id="2:4"></div>
                <div className="target-minor" id="2:6"></div>
                <p className="target-text" id="2:7">TARGET</p>
                <p className="target-num" id="2:26">{finalNumCheck ? finalNum : "???"}</p>
              </div>
              <div className="time" id="103:4">
                <div className="time-main" id="2:17"></div>
                <div className="time-minor" id="2:18"></div>
                <p className="time-text" id="2:19">TIME</p>
                <Countdown initialCountdownSeconds={3000} onCountdownEnd={handleAnswer} answerSubmit={displayScore} start={finalNumCheck} />
              </div>
            </div>
          </div>
          <div className="numbers" id="103:12">
            {initialNums}
          </div>
        </div>
        <div className="operators" id="103:19">
          <button 
            className="restart" 
            onClick={()=>handleRestart()}
            disabled={areButtonsDisabled}>
          Res
          </button>
          <div className="ope-together">
            {fourOpeComp}
          </div>
          <button 
            className="delete" 
            onClick={()=>handleUndo()} 
            disabled={areButtonsDisabled}>
          Undo
          </button>
        </div>
      </div>
        }
    </>
  )
}

export default App
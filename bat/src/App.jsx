import { useState, useEffect } from 'react'
import Countdown from './assets/Countdown'



// eğer yapılacak başka işlem kalmadıysa sonucu göstersin.




import './App.css'

function App() {
  
  const [start, setStart] = useState(true)
  const [firstNum, setFirstNum] = useState("")
  const [secondNum, setSecondNum] = useState("")
  const [ope, setOpe] = useState("")
  const [operations, setOperations] = useState([]);
  const [finalNum, setFinalNum] = useState("")
  const [nums, setNums] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(Array(nums.length).fill(false))
  const [displayButtonDisabled, setDisplayButtonDisabled] = useState([])
  const [score, setScore] = useState("")
  const [displayScore, setDisplayScore] = useState(false)
  const [firstNumIndex, setFirstNumIndex] = useState()
  const [secondNumIndex, setSecondNumIndex] = useState()
  
  
  

  useEffect(() => {
    setFinalNum(Math.floor((Math.random() * 10) * 34));
    const generatedNums = {};
    for (let i = 0; i < 6; i++) {
      generatedNums[i] = { value: Math.floor((Math.random() * 10)) + 1, isEnabled: true };
    }
    setNums(generatedNums);
  }, []);

   
  //functions

  function result(firstNumber, operator, secondNumber) {
    if (operator === "+") {
      return +firstNumber + +secondNumber;
    } else if (operator === "-") {
      if (firstNumber <= secondNumber) {
        return secondNumber - firstNumber;
      } else {
        return firstNumber - secondNumber;
      }
    } else if (operator === "*") {
      return firstNumber * secondNumber;
    } else {
      if (firstNumber % secondNumber !== 0) {
        return false;
      } else {
        return firstNumber / secondNumber;
      }
    }
  }

  function handleCalculate() {
    const calculatedResult = result(firstNum, ope, secondNum);
  
    if (calculatedResult !== false) {
      const operation = {
        firstNum,
        ope,
        secondNum,
        count: calculatedResult,
      };
      setOperations((prevOperations) => [...prevOperations, operation]);
      setFirstNum("");
      setOpe("");
      setSecondNum("");
    } else {
      setFirstNum("");
      setOpe("");
      setSecondNum("");
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[firstNumIndex] = { ...updatedNums[firstNumIndex], isEnabled: true };
        return updatedNums;
      })
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[secondNumIndex] = { ...updatedNums[secondNumIndex], isEnabled: true };
        return updatedNums;
      })
    }
  }

  function handleNumClick(value, index) {
    if (firstNum === "") {
      setFirstNum(value)
      setFirstNumIndex(index)
      
    } else if(firstNum && !ope){
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[firstNumIndex] = { ...updatedNums[firstNumIndex], isEnabled: true };
        return updatedNums;
      })
      setFirstNum(value)
      setFirstNumIndex(index)

    }else if (ope !== "") {
      setSecondNumIndex(index)
      setSecondNum(value);
    } else {
      setFirstNum(value);
    }
  
    setNums((prevNums) => {
      const updatedNums = { ...prevNums };
      updatedNums[index] = { ...updatedNums[index], isEnabled: false };
      return updatedNums;
    });
  }
  
  function handleNewNumberClick(value, index){
    if(firstNum===""){
      setFirstNum(value)
    } else if(ope !== ""){
      setSecondNum(value)
    } else {
      setFirstNum(value)
    }
    setDisplayButtonDisabled((prevDisplayButtonDisabled) => {
      const newButtonDisabled = [...prevDisplayButtonDisabled, false];
      newButtonDisabled[index] = true;
      return newButtonDisabled;
    })
  }

  function handleAnswer(){
    const finalCount = operations.slice(-1)
    
    const score = Number(finalNum) - Number(finalCount[0].count)

    setScore(score)
    setDisplayScore(true)
    
  }
  function handleDelete(){
    if(firstNum && ope && secondNum){
      setSecondNum("");
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[secondNumIndex] = { ...updatedNums[secondNumIndex], isEnabled: true };
        return updatedNums;
      })
      setSecondNumIndex(null)
    } else if(firstNum && ope){
      setOpe("")
    } else if (firstNum){
      setFirstNum("");
      setNums((prevNums) => {
        const updatedNums = { ...prevNums };
        updatedNums[firstNumIndex] = { ...updatedNums[firstNumIndex], isEnabled: true };
        return updatedNums;
      })
      setFirstNumIndex(null)
    }
  }

  function handleRestart(){
    setFirstNum("")
    setSecondNum("")
    setOpe("")
    setOperations([])
    setNums((prevNums) => {
      const updatedNums = { ...prevNums };
      Object.keys(updatedNums).forEach((index) => {
        updatedNums[index] = { ...updatedNums[index], isEnabled: true };
      });
      return updatedNums;
    });
    
    setDisplayButtonDisabled([])
    setDisplayScore(false)
  }

  function gameOver(){

    setDisplayButtonDisabled(displayButtonDisabled.map(()=>true))
    setButtonDisabled(buttonDisabled.map(()=>true))
//en başta array falselar ile dolu değil.(false'lar ile doldurulabilir)
    const updatedArray1 = displayButtonDisabled.map(() => true);
    setDisplayButtonDisabled(updatedArray1);
//hepsini disable yapmıyor ama run dev'den kaynaklı olabilir. Preview'de görmek gerekir.
    const updatedArray2 = buttonDisabled.map(()=>true);
    setButtonDisabled(updatedArray2)


    
    const finalCount = operations.slice(-1)
    const score = Number(finalNum) - Number(finalCount[0].count)

    setScore(score)
    setDisplayScore(true)
  }

  //Numbers and Operation

  const initialNums = Object.keys(nums).map((index) => {
    const num = nums[index];
    return (
      <button
        key={index}
        value={num.value}
        onClick={() => handleNumClick(num.value, index)}
        disabled={!num.isEnabled}
      >
        {num.value}
      </button>
    );
  });

  const displayOperation =  operations.map((operation, index) => (
    <div key={index} className="operations">
      <p>
        {`${operation.firstNum} ${operation.ope} ${operation.secondNum} = ${operation.count}`}
      </p>
      <button value={operation.count} onClick={()=>handleNewNumberClick(operation.count, index)} disabled={displayButtonDisabled[index]}>{operation.count}</button>
    </div>
  ))

  const fourOpe = ["+","-","/","*"]

  const fourOpeComp = fourOpe.map((op,index) => (
  <button key={index} value={op} onClick={e => setOpe(e.target.value)}>{op}</button>)
  )

  const text = "you win!!"



  //startGame Component(unused for now as Component)
  const startGame = function startPage(){
    return(
      <div>
        <p>Welcome to Bir İşlem!</p>
        <button onClick={()=>setStart(false)}>Start Game</button>
      </div>
    )
  }

  return (
    <>
      
        {start ?
        <div>
        <h1>Welcome to Bir İşlem!</h1>
        <p>You will have 30 seconds to find the number when you start the game.</p>
        <h3>When you ready, start the game!</h3>
        <button onClick={()=>setStart(false)}>Start Game</button>
      </div> :
        <div>
      <h1>Bir İşlem</h1>
      <h2>Number to Win: {finalNum}</h2>
      <Countdown initialCountdownSeconds={30} onCountdownEnd={gameOver} />
      
      <h2>Numbers</h2>
      <div>
        {initialNums}
      </div>
      <h2>Operators</h2>
      <div>
        {fourOpeComp}
        <button onClick={()=>handleCalculate()}>=</button>
        <button onClick={()=>handleDelete()}>Del</button>
        <button onClick={()=>handleRestart()}>Res</button>
      </div>
      <div>
        <h2>Display: {ope ? firstNum+ope+secondNum : firstNum} </h2>
        <div>
      </div>
        <h2>Operations : {displayOperation} </h2>
      </div>
      <div>
        <button onClick={()=>handleAnswer()}>Submit Answer</button>
      </div>
      {displayScore ?
      <div>
      <p>Your Score is: {score===0 ? text : score}</p>
      </div> :
      <div>

      </div>
      }
      </div>
        }
        
      
      
      
    </>
  )
}

export default App
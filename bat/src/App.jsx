import { useState, useEffect } from 'react'

//delete button operation sonrasında ulaşılan numarayla düzgün çalışmıyor
//tam bölünmüyorsa bölmesin
//eksi çıkan işlemlerde display kısmında işlemi düzgün göstersin(first ve secondNum değişimi)
//kodda 

import './App.css'

function App() {
  
  const [firstNum, setFirstNum] = useState("")
  const [secondNum, setSecondNum] = useState("")
  const [ope, setOpe] = useState("")
  const [operations, setOperations] = useState([]);
  const [finalNum, setFinalNum] = useState("")
  const [nums, setNums] = useState([])
  const [buttonDisabled, setButtonDisabled] = useState(Array(nums.length).fill(false))
  const [displayButtonDisabled, setDisplayButtonDisabled] = useState([])
  const [score, setScore] = useState("")
  const [displayScore, setDisplayScore] = useState(false)

  useEffect(() => {
    setFinalNum(Math.floor((Math.random()*10) * 34))
    for(let i=0; i<6;i++){
      setNums(prevNums => [...prevNums, (Math.floor((Math.random() * 10))+1)])
    }
  }, [])
   
  //functions

  function result(a,b,c){
    if(b === "+"){
      return +a + +c
    }else if(b === "-"){
      if(a <= c){
        return c-a
      }else{
        return a-c
      }
    } else if (b === "*"){
      return a*c
    } else {
      return (a/c).toFixed(2)
    }
  }

  function handleCalculate(){
    const calculatedResult  = result(firstNum,ope,secondNum)
    const operation = {
      firstNum,
      ope,
      secondNum,
      count: calculatedResult 
    }
    setOperations(prevOperations => [...prevOperations, operation])
    setFirstNum("")
    setOpe("")
    setSecondNum("")
  };

  function handleNumClick(value, index){
    if(firstNum===""){
      setFirstNum(value)
    } else if(ope !== ""){
      setSecondNum(value)
    } else {
      setFirstNum(value)
    }
    setButtonDisabled((prevButtonDisabled) => {
      const newButtonDisabled = [...prevButtonDisabled];
      newButtonDisabled[index] = true;
      return newButtonDisabled;
    })
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
    console.log(finalCount[0].count)
    const score = Number(finalNum) - Number(finalCount[0].count)

    setScore(score)
    setDisplayScore(true)
    
  }

  function handleDelete(){
    if(secondNum){
      setSecondNum("")
      setButtonDisabled((prevButtonDisabled) => {
        const newButtonDisabled = [...prevButtonDisabled];
        const lastDisabledIndex = newButtonDisabled.lastIndexOf(true);
        if (lastDisabledIndex !== -1) {
          newButtonDisabled[lastDisabledIndex] = false;
        }
        return newButtonDisabled;
      })
    } else if(firstNum && ope){
      setOpe("")
    } else if (firstNum){
      setFirstNum("")
      setButtonDisabled((prevButtonDisabled) => {
        const newButtonDisabled = [...prevButtonDisabled];
        const lastDisabledIndex = newButtonDisabled.lastIndexOf(true);
        if (lastDisabledIndex !== -1) {
          newButtonDisabled[lastDisabledIndex] = false;
        }
        return newButtonDisabled;
      })
    } else {

    }
    
  }

  function handleRestart(){
    setFirstNum("")
    setSecondNum("")
    setOpe("")
    setOperations([])
    setButtonDisabled(Array(nums.length).fill(false))
    setDisplayButtonDisabled([])
    setDisplayScore(false)
  }

  //Numbers and Operation

  const initialNums = nums.map((num, index)=>(
    <button key={index} value={num} onClick={()=>handleNumClick(num, index)} disabled={buttonDisabled[index]}>{num}</button>
  ))

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

  return (
    <>
      <h1>Bir İşlem</h1>
      <h2>Number to Win: {finalNum}</h2>
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
      
    </>
  )
}

export default App

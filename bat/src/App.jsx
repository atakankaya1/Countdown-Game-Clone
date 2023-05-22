import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState("")
  const [firstNum, setFirstNum] = useState("")
  const [secondNum, setSecondNum] = useState("")
  const [ope, setOpe] = useState("")

  //const [display, setDisplay] = useState(firstNum+ope+secondNum || "")
  //display anlık değişmeli ve önceki işlemleri tutmalı

  const [finalNum, setFinalNum] = useState("")
  const [num1, setNum1] = useState("")
  const [num2, setNum2] = useState("")
  const [num3, setNum3] = useState("")
  const [num4, setNum4] = useState("")
  const [num5, setNum5] = useState("")

  useEffect(() => {
    setFinalNum(Math.floor((Math.random()+1) * 12))
    setNum1(Math.floor((Math.random() * 10))+1)
    setNum2(Math.floor((Math.random() * 10))+1)
    setNum3(Math.floor((Math.random() * 10))+1)
    setNum4(Math.floor((Math.random() * 10))+1)
    setNum5(Math.floor((Math.random() * 10))+1)
  }, []);
   
  
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
      return a/c
    }
  }
  console.log(`first=${firstNum}`)
  console.log(`ope=${ope}`)
  console.log(`sec=${secondNum}`)
  return (
    <>
    
      <h1>Bir İşlem</h1>

      <h2>Final Num: {finalNum}</h2>
      
      <h2>Numbers</h2>
      <div>
        <button value={num1}onClick={e => firstNum==="" ? setFirstNum(e.target.value) : setSecondNum(e.target.value)}>{num1}</button>
        <button value={num2}onClick={e =>firstNum==="" ? setFirstNum(e.target.value) : setSecondNum(e.target.value)}>{num2}</button>
        <button value={num3}onClick={e =>firstNum==="" ? setFirstNum(e.target.value) : setSecondNum(e.target.value)}>{num3}</button>
        <button value={num4}onClick={e =>firstNum==="" ? setFirstNum(e.target.value) : setSecondNum(e.target.value)}>{num4}</button>
        <button value={num5}onClick={e =>firstNum==="" ? setFirstNum(e.target.value) : setSecondNum(e.target.value)}>{num5}</button>
      </div>
      <h2>Operators</h2>
      <div>
        <button value={"+"} onClick={e => {setOpe(e.target.value)}}>+</button>
        <button value={"-"} onClick={e => setOpe(e.target.value)}>-</button>
        <button value={"/"} onClick={e => setOpe(e.target.value)}>÷</button>
        <button value={"*"} onClick={e => setOpe(e.target.value)}>*</button>
        <button onClick={function() {
          setCount(result(firstNum,ope,secondNum))
          
          }}>=</button>
        <button onClick={function(){
          setCount("")
          setFirstNum("")
          setSecondNum("")
          setOpe("")
        }}>Res</button>
        
      </div>
      <div>
        <h2>Display: {firstNum+ope+secondNum} </h2>
        
        <h2 >{count}</h2>
        
        
      </div>
      <h1>Result</h1>
      <h2></h2>
      
  
     
    </>
  )
}

export default App

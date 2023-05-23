import { useState, useEffect } from 'react'

import './App.css'

function App() {
  //buttonlar basıldıktan sonra kullanılmaz hale gelsin.
  const [firstNum, setFirstNum] = useState("")
  const [secondNum, setSecondNum] = useState("")
  const [ope, setOpe] = useState("")
  const [operations, setOperations] = useState([]);
  

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
  }, [])
   
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

  const displayOperation =  operations.map((operation, index) => (
    <div key={index} class="operations">
      <p>
        {`${operation.firstNum} ${operation.ope} ${operation.secondNum} = ${operation.  count}`}
      </p>
      <button value={operation.count} onClick={e => firstNum==="" ? setFirstNum(e.  target.value) : ope !== "" ? setSecondNum(e.target.value) : setFirstNum(e.target. value)}>{operation.count}</button>
    </div>
  ))



 
  
  //console.log(operations)
  
  return (
    <>
    
      <h1>Bir İşlem</h1>

      <h2>Number to Win: {finalNum}</h2>
      
      <h2>Numbers</h2>
      <div>
        <button value={num1}onClick={e => firstNum==="" ? setFirstNum(e.target.value) : ope !== "" ? setSecondNum(e.target.value) : setFirstNum(e.target.value)}>{num1}</button>
        <button value={num2}onClick={e => firstNum==="" ? setFirstNum(e.target.value) : ope !== "" ? setSecondNum(e.target.value) : setFirstNum(e.target.value)}>{num2}</button>
        <button value={num3}onClick={e => firstNum==="" ? setFirstNum(e.target.value) : ope !== "" ? setSecondNum(e.target.value) : setFirstNum(e.target.value)}>{num3}</button>
        <button value={num4}onClick={e => firstNum==="" ? setFirstNum(e.target.value) : ope !== "" ? setSecondNum(e.target.value) : setFirstNum(e.target.value)}>{num4}</button>
        <button value={num5}onClick={e => firstNum==="" ? setFirstNum(e.target.value) : ope !== "" ? setSecondNum(e.target.value) : setFirstNum(e.target.value)}>{num5}</button>
      </div>
      <h2>Operators</h2>
      <div>
        <button value={"+"} onClick={e => {setOpe(e.target.value)}}>+</button>
        <button value={"-"} onClick={e => setOpe(e.target.value)}>-</button>
        <button value={"/"} onClick={e => setOpe(e.target.value)}>÷</button>
        <button value={"*"} onClick={e => setOpe(e.target.value)}>*</button>
        
        <button onClick={()=>handleCalculate()}>=</button>
        
        <button onClick={function(){
          setFirstNum("")
          setSecondNum("")
          setOpe("")
          setOperations([])

        }}>Res</button>
        
      </div>
      <div>
        <h2>Display: {ope ? firstNum+ope+secondNum : firstNum} </h2>
        <div>
       
      </div>
        <h2>Operations : {displayOperation} </h2>
      </div>
  
      
  
     
    </>
  )
}

export default App

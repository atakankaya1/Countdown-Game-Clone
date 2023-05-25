import { useState, useEffect } from 'react'

//buttonlar basıldıktan sonra kullanılmaz hale gelsin.
//sumbit butonu olsun-win ya da score göstersin
//delete button u olsun
//tam bölünmüyorsa bölmesin
//yeni gelen numara ile işlem yapınca 
//minus çıkıyor
import './App.css'

function App() {
  
  const [firstNum, setFirstNum] = useState("")
  const [secondNum, setSecondNum] = useState("")
  const [ope, setOpe] = useState("")
  const [operations, setOperations] = useState([]);
  const [finalNum, setFinalNum] = useState("")
  const [nums, setNums] = useState([])
  const [buttonStates, setButtonStates] = useState([false, false, false, false, false, false]);

  useEffect(() => {
    setFinalNum(Math.floor((Math.random()*10) * 34))

    for(let i=0; i<3;i++){
      setNums(prevNums => [...prevNums, (Math.floor((Math.random() * 10))+1)])
    }

    
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

  
  const initialNums = nums.map((num, index)=>(
    <button key={index} value={num} onClick={e => firstNum==="" ? setFirstNum(e.target.value) : ope !== "" ? setSecondNum(e.target.value) : setFirstNum(e.target.value)} disabled={(firstNum !== "" && ope === "") || secondNum !== ""}>{num}</button>
  ))


  const displayOperation =  operations.map((operation, index) => (
    <div key={index} className="operations">
      <p>
        {`${operation.firstNum} ${operation.ope} ${operation.secondNum} = ${operation.count}`}
      </p>
      <button value={operation.count} onClick={e => firstNum==="" ? setFirstNum(e.  target.value) : ope !== "" ? setSecondNum(e.target.value) : setFirstNum(e.target. value)}>{operation.count}</button>
    </div>
  ))

  function handleNumClick(e, index){
    if(firstNum===""){
      setFirstNum(e.target.value)
    } else if(ope !== ""){
      setSecondNum(e.target.value)
    } else {
      setFirstNum(e.target.value)
    }
    const newButtonStates = [...buttonStates]
    newButtonStates[index] = true
    setButtonStates(newButtonStates)
  }




  const fourOpe = ["+","-","/","*"]
  const fourOpeComp = fourOpe.map((op,index) => (
  <button key={index} value={op} onClick={e => setOpe(e.target.value)}>{op}</button>)
  )

  
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

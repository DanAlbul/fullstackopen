import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Display = ({ counter }) => <div>{counter}</div>

const App = () => {
  let [counter, setCounter] = useState(0)

  const  increaseByOne = () => setCounter(counter + 1)
  const  decreaseByOne = () => setCounter(counter - 1)
  const  setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button content="plus" onClick={increaseByOne}/>
      <Button content="zero" onClick={setToZero}/>
      <Button content="minus" onClick={decreaseByOne}/>
    </div>
  )
}

export default App

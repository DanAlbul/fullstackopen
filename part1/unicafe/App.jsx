import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const average = ((good - bad) / (good + neutral + bad)) || 0
  const positive = (good / (good + neutral + bad)) * 100 || 0
  const total = good + neutral + bad
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text="good" value={good}/>
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral}/>
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad}/>
        </tr>
        <tr>
          <StatisticLine text="all" value={total}/>
        </tr>
        <tr>
          <StatisticLine text="average" value={average}/>
        </tr>
        <tr>
          <StatisticLine text="positive" value={`${positive}%`}/>
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const Button = ({onClick, name}) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const isRated = good + neutral + bad !== 0

  const handleVote = (option) => {
    switch(option) {
      case 'good':
        setGood(good + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        break
      case 'bad':
        setBad(bad + 1)
        break
      default:
        break
    }
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <div>
        <Button onClick={() => handleVote('good')} name="good"/>
        <Button onClick={() => handleVote('neutral')} name="neutral"/>
        <Button onClick={() => handleVote('bad')} name="bad"/>
      </div>
      <h2>Statistics</h2>
      {isRated ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

export default App

import NumbersForm from './components/NumbersForm'
import NumbersList from './components/NumbersList'
import NumbersFilter from './components/NumbersFilter'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if(newNumber === '') {
      alert(`Please enter a number`)
      return
    }
    if (newName === '') {
      alert(`Please enter a name`)
      return
    }
    if (persons.find(person => person.name === newName.trim())) {
      alert(`${newName.trim()} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value),
   handleNumberChange = (event) => setNewNumber(event.target.value),
   handleFilterChange = (event) => setFiltered(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <NumbersFilter filtered={filtered} handleFilterChange={handleFilterChange}/>
      <NumbersForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <NumbersList persons={persons} filtered={filtered}/>
    </div>
  )
}

export default App

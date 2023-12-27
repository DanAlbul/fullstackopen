import NumbersForm from './components/NumbersForm'
import Number from './components/Number'
import NumbersFilter from './components/NumbersFilter'
import personsService from './services/numbers'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  useEffect(() => {
    personsService
    .getAll()
    .then(intialPersons => {
      setPersons(intialPersons)
    }).catch(error => {
      console.log(error)
      alert(`Error fetching data from server`)
      return []
    })
  }, [])

  const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()

    // check if number is filled
    if(newNumber === '') {
      alert(`Please enter a number`)
      return
    }

    // check if name is filled
    if (newName === '') {
      alert(`Please enter a name`)
      return
    }

    // check if number is already used by another person
    const isNumberAlreadyAdded = persons.find(person => person.number === newNumber.trim())
    if(isNumberAlreadyAdded && isNumberAlreadyAdded.name !== newName.trim())  {
      alert(`${newNumber.trim()} is already used by ${isNumberAlreadyAdded.name}. \nPlease enter a different number.`)
      return
    }

    // check if person is already added and ask if user wants to update the number
    const personToUpdate = persons.find(person => person.name === newName.trim())
    if (personToUpdate) {
      if (window.confirm(`${newName.trim()} is already added to phonebook. \nWould you like to replace the old number with a new one?`)) {
        personsService.
          updateById(personToUpdate.id, {...personToUpdate, number: newNumber})
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          }).catch(error => {
              alert(`Error updating ${personToUpdate.name} number`)
              setPersons(persons.filter(person => person.id !== personToUpdate.id))
          })
      } else return
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 1000000),
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      .catch(error => {
        console.log(error)
        alert(`Error adding ${newPerson.name} to server`)
        setPersons(persons.filter(person => person.id !== newPerson.id))
      })
    setNewName('')
    setNewNumber('')
  }

  const onDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} number?`)) {
      personsService
        .deleteById(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id)) })
        .catch(error => {
          console.log(error)
          alert(`Person with id ${id} is already removed from the server`)
          setPersons(persons.filter(person => person.id !== id))
      })
    } else return
  }

  const handleNameChange = (event) => setNewName(event.target.value),
   handleNumberChange = (event) => setNewNumber(event.target.value),
   handleFilterChange = (event) => setFiltered(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <NumbersFilter
        filtered={filtered}
        handleFilterChange={handleFilterChange}
      />
      <NumbersForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <>
        <h3>Numbers list</h3>
        <ol>
          {numbersToShow.map(person => (
            <Number person={person} key={person.name} onDelete={onDelete}/>
          ))}
        </ol>
      </>
    </div>
  )
}

export default App

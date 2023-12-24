const NumbersList = ({ persons, filtered }) => {
  const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()))
  return (
    <>
      <h3>Numbers list</h3>
      <ol>
        {numbersToShow.map(person => (
          <li key={person.name}>{person.name} : {person.number}</li>
        ))}
      </ol>
    </>
  )
}

export default NumbersList

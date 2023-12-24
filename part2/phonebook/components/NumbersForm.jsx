const NumbersForm = ({ handleSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      <h3>Add a new number</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default NumbersForm

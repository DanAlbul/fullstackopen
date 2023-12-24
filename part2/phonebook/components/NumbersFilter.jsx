const NumbersFilter = ({ filtered, handleFilterChange }) => {
  return (
    <div>
      filter by name: <input value={filtered} onChange={handleFilterChange}/>
    </div>
  )
}

export default NumbersFilter

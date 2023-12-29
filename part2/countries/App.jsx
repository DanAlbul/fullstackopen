import { useState, useEffect } from "react"
import axios from "axios"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response => {
      const returnedCountries = response.data
      setCountries(returnedCountries)
    }).catch(error => {
      console.log(error)
      alert(`Error fetching data from server`)
      // if error, set countries to empty array
      setCountries([])
    })
  }, [search])


  // filter countries to show based on search
  const handleSearch = (event) => setSearch(event.target.value)
  const countriesToShow = !search.trim()
    // if search is empty, show nothing
    ? []
    // if search is not empty, show countries that match search
    : countries.filter(country => country?.name?.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h1>Countries</h1>
      <div>
        search <input type="text" value={search} onChange={handleSearch} />
      </div>
      <div>
        <Countries search={search} countries={countriesToShow} />
      </div>
    </div>
  )
}

export default App

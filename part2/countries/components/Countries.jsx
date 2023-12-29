import Country from "./Country"

const Countries = ({ countries, search }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>

  if (countries.length === 0 && search.trim() === "")
    return <p>Enter country name to search</p>

  if (countries.length === 0 && search.trim() !== "")
    return <p>No matches found</p>

  return countries.map((country) => (
    <div key={country?.name?.common}>
      { countries.length > 1
				? (
				<div>
      	  <Country showState={false} country={country} />
      	</div>
      	) : (
      	  <Country showState={true} country={country} />
      	)}
    </div>
  ))
}

export default Countries

import { useState, useEffect } from "react"
import CountryDetail from "./CountryDetail"
import axios from "axios"

const Country = ({ country, showState = false }) => {
  const [activeState, setActiveState] = useState(showState)
	const [weather, setWeather] = useState({})
  const handleShow = () => setActiveState(!activeState)

	useEffect(() => {
		const api_key = import.meta.env.VITE_WEATHER_API_KEY
		const weather_request_by_capital_url = `https://api.openweathermap.org/data/2.5/weather?q=${country?.capital}&APPID=${api_key}`
		country && axios.get(weather_request_by_capital_url)
			.then(response => setWeather(response.data))
			.catch(error => {
				console.log(error)
				setWeather({})
			})
	}, [])

  return (
    <div>
      <div className="country_preview_container">
        <h4>{country?.name?.common || 'N/A'}</h4>
        <button onClick={handleShow}>{activeState ? "hide" : "show"}</button>
      </div>
    { activeState && <CountryDetail country={country} weather={weather} /> }
    </div>
  )
}

export default Country

const CountryDetail = ({ country, weather }) => {
  const languges = country?.languages ? Object.values(country?.languages).map((language, i) => <li key={i}>{language}</li>) : 'N/A'
	const kelvinToCelsius = (kelvin) =>  {
		if (!kelvin) return 'N/A'
			return `${(kelvin - 273.15).toFixed(1)} °C` || 'N/A'
	}
	const weatherIcon = weather?.weather ? `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png` : ''
	const weatherDescription = weather?.weather ? weather?.weather[0]?.description : ''

  return (
    <div className="country_block">
      <div>
        <p><b>Capital:</b> {country?.capital || 'N/A'}</p>
        <p><b>Area:</b> {country?.area || 'N/A'}</p>
        <p><b>Population:</b> {country?.population || 'N/A'}</p>
        <b>Languages:</b>
        <ul>
          {languges}
        </ul>
      </div>
      <img className="flag" src={country?.flags?.png} alt="flag" width="100" height="auto" />
			{// if country capital and weather are both available, show weather
				country?.capital && weather?.weather ? (
					<div>
						<h4>Weather in {country?.capital || 'N/A'}</h4>
						<p><b>Temperature:</b> {kelvinToCelsius(weather?.main?.temp)}</p>
						<div>
							<div>
								<img src={weatherIcon} title={weatherDescription} alt="weather icon" width="50" height="50" />
							</div>
							<b>Wind:</b> {weather?.wind?.speed || 'N/A'} m/s | <b>direction:</b> {weather?.wind?.deg + ' °deg'|| 'N/A'}
						</div>
					</div>
				) : (
			<div>Weather information is not available</div>)}
    </div>
  )
}
export default CountryDetail

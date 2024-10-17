import React, { useState } from "react";
import "./App.css";
import SearchBar from "./componnets/SearchBar/SearchBar";
import TodaysDate from "./containers/TodaysDate/TodaysDate";
import Weather from "./componnets/Weather/Weather";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // State for forecast data
  const [error, setError] = useState(null); // State for error handling

  return (
    <main>
      <h1>Weather for next 5 days </h1>
      <SearchBar
        setWeather={setWeather}
        setForecast={setForecast}
        setError={setError}
      />{" "}
      {/* Pass state setters */}
      {error && <p className="error">{error}</p>} {/* Display error message */}
      {weather && forecast && (
        <Weather weather={weather} forecast={forecast} />
      )}{" "}
      {/* Pass both weather and forecast */}
    </main>
  );
};

export default App;

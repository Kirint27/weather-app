import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

const SearchBar = ({ setWeather, setForecast, setError, setTimeZone }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const search = () => {
    if (!searchTerm) return; // Validate input

    // Fetch current weather data
    fetch(`${api.base}weather?q=${searchTerm}&appid=${api.key}&units=metric`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found"); // Handle error
        }
        return res.json();
      })
      .then((currentWeatherData) => {
        setWeather(currentWeatherData);
        setCity(currentWeatherData.name);
        setCountry(currentWeatherData.sys.country);
        setSearchTerm(""); // Clear the search input
        setError(null); // Clear any previous errors
        
        // Set the timezone based on the API response
        setTimeZone(currentWeatherData.timezone);

        // Fetch the forecast data using latitude and longitude
        const {
          coord: { lat, lon },
        } = currentWeatherData;
        return fetch(
          `${api.base}forecast?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`
        );
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Forecast data not available"); // Handle error
        }
        return res.json();
      })
      .then((forecastData) => {
        setForecast(forecastData); // Set forecast data
      })
      .catch((err) => {
        setWeather(null); // Reset weather state on error
        setForecast(null); // Reset forecast state on error
        setError(err.message); // Set error message for user feedback
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(); // Call search function on Enter key press
    }
  };

  return (
    <>
      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search city..."
          onChange={(e) => setSearchTerm(e.target.value)} // Update search text
          onKeyDown={handleKeyDown} // Attach key down event
          value={searchTerm} // Controlled input value linked to searchTerm
        />
      </div>
      {city && country && <h2>{city}, {country}</h2>} {/* Display city and country only if they exist */}
    </>
  );
};

export default SearchBar;

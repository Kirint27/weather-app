import React, { useState } from "react";
import "./App.css";
import SearchBar from "./componenets/SearchBar/SearchBar";
import TodaysDate from "./containers/TodaysDate/TodaysDate";
const api = {
  key: "4d359c0d2e6fab4b2f48f359d1dd6118",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  

  const search = (searchTerm) => {
    // if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${searchTerm}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
            setQuery("");
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }


  

  return (
  
      <main>
        <h1>Weather App</h1>
        <h2>Search for todays weather</h2>
        <TodaysDate />
        <SearchBar updateSearchText={search} />
        {typeof weather.main != "undefined" ? (
          <div class="text">
            <div className="weather-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
                <div className="weather">
                  {" "}
                  <p class="description">{weather.weather[0].description}</p>
                </div>
              </div>

              <div className="temp">
                {" "}
                Current temp{" "}
                <p class="description">{Math.round(weather.main.temp)}°c</p>
              </div>
              <div className="feelsLike">
                Feels like{" "}
                <p class="description">
                  {Math.round(weather.main.feels_like)}°c
                </p>
              </div>
              <div className="feelsLike">
                Cloud cover<p class="description">{weather.clouds.all}%</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    
    
  );
 };

export default App;
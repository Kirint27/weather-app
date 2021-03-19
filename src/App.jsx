import React, { useState } from "react";
import "./App.css";
import SearchBar from "./componenets/SearchBar/SearchBar";
// import Display from "./containers/Display/Display";
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
          //  setQuery("");
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }


  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
  
      <main>
        <h1>Weather App</h1>
        <h2>Search for todays weather</h2>
        <div className="date">{dateBuilder(new Date())}</div>
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
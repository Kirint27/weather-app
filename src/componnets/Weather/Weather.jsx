import React from "react";
import styles from "./Weather.module.scss"; // Ensure this path is correct
import WeatherCard from "../WeatherCard/WeatherCard";
const Weather = ({ forecast, weather }) => {
  // Create icon URL based on the current weather condition code
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className={styles.weatherContainer}>
      {forecast && forecast.list && forecast.list.length > 0 ? (
        forecast.list.map((item, index) => {
          // Group data by day; assuming forecast is in 3-hour intervals, select one entry per day
          const date = new Date(item.dt * 1000).toLocaleDateString();
          const temp = Math.round(item.main.temp); // Current temperature
          const precipitation = item.rain ? item.rain["1h"] : 0; // Precipitation in mm
          const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const weatherDescription = item.weather[0].description;
          const precipitationProbability = item.pop
            ? (item.pop * 100).toFixed(0)
            : 0; // Convert to percentage, default to 0 if           const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          // Return JSX for each weather forecast entry
          return (
            <WeatherCard
              key={index}
              date={date}
              time={time}
              temp={temp}
              weatherDescription={weatherDescription}
              icon={item.weather[0].icon}
              precipitationProbability={precipitationProbability}
            />
          );
        })
      ) : (
        <p>No weather data available.</p> // Fallback message when no data is available
      )}
    </div>
  );
};


export default Weather;

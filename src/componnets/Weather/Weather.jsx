import React, { useState } from "react";
import styles from "./Weather.module.scss"; // Ensure this path is correct
import WeatherCard from "../WeatherCard/WeatherCard";

const Weather = ({ forecast }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  // Group forecast data by day
  const groupedForecast = forecast.list.reduce((dailyForecasts, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(item);
    return dailyForecasts;
  }, {});

  const handleDayClick = (date) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  return (
    <div className={styles.weatherContainer}>
      {Object.keys(groupedForecast).length > 0 ? (
        Object.keys(groupedForecast).map((date) => {
          const dayData = groupedForecast[date];

          return (
            <div key={date}>
              <div
                className={styles.dayCard}
                onClick={() => handleDayClick(date)}
              >
                <h3 styles={styles.date}>{date}</h3>
              </div>
              {expandedDay === date && (
                <div className={styles.hourlyForecast}>
                  {dayData.map((item, index) => {
                    const time = new Date(item.dt * 1000).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );
                    const temp = Math.round(item.main.temp);
                    const precipitationProbability = item.pop
                      ? (item.pop * 100).toFixed(0)
                      : 0;
                    const weatherDescription = item.weather[0].description;
                    const icon = item.weather[0].icon;
                    return (
                      <WeatherCard
                        key={index}
                        date={time} // Show time here
                        temp={temp}
                        weatherDescription={weatherDescription}
                        icon={icon}
                        precipitationProbability={precipitationProbability}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No weather data available.</p> // Fallback message when no data is available
      )}
    </div>
  );
};
export default Weather;

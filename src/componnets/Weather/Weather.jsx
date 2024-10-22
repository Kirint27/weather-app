import React, { useState } from "react";
import styles from "./Weather.module.scss";
import WeatherCard from "../WeatherCard/WeatherCard";

const Weather = ({ forecast, timeZone }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  // Function to convert UTC time to local time using the timezone offset
  const convertToLocalTime = (utcTime, timezoneOffset) => {
    // Correct calculation: utcTime is in seconds, timezoneOffset is in seconds, so we adjust accordingly
    const localTime = new Date((utcTime + timezoneOffset) * 1000);
    return localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  
  // Group forecast data by day
  const groupedForecast = forecast.list.reduce((dailyForecasts, item) => {
    const date = new Date((item.dt + timeZone) * 1000).toLocaleDateString();
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
                <h3 className={styles.date}>{date}</h3>
              </div>
              {expandedDay === date && (
                <div className={styles.hourlyForecast}>
                  {dayData.map((item, index) => {
                    // Convert UTC to local time using the timezone offset
                    const time = convertToLocalTime(item.dt, timeZone);
                    const temp = Math.round(item.main.temp);
                    const precipitationProbability = item.pop
                      ? (item.pop * 100).toFixed(0)
                      : 0;
                    const weatherDescription = item.weather[0].description;
                    const icon = item.weather[0].icon;

                    return (
                      <WeatherCard
                        key={index}
                        date={time} // Show local time here
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
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default Weather;

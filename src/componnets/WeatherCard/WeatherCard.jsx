import React from "react";
import styles from "./WeatherCard.module.scss"; // Ensure the path is correct

const WeatherCard = ({ date, time, temp, weatherDescription, icon, precipitationProbability }) => {
  return (
    <div className={styles.weatherBox}>
      <h4>{date}</h4>
      <p>{time}</p>
      <div className={styles.weather}>
        <p className={styles.description}>{weatherDescription}</p>
        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={weatherDescription} className={styles.icon} />
      </div>
      <div className={styles.temp}>
        <p>Temperature: {temp}°C</p>
      </div>
      <div className={styles.cloudCover}>
        Probability of rain: {precipitationProbability}%
      </div>
    </div>
  );
};

export default WeatherCard;

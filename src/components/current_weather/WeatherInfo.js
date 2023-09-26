import React, { useState, useEffect } from "react";

const WeatherInfo = ({ latitude, longitude, apiKey }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Check if latitude, longitude, and API key are available
    if (latitude && longitude && apiKey) {
      // Make a request to the OpenWeatherMap API
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Set the weather data in the state
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [latitude, longitude, apiKey]);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather Information</h2>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Visibility: {(weatherData.visibility / 1000).toFixed(2)} km</p>
          <p>Dew Point: {calculateDewPoint(weatherData.main.temp, weatherData.main.humidity).toFixed(2)}°C</p>
          {/* Add more weather data fields as needed */}
        </div>
      ) : (
        <p>Loading weather information...</p>
      )}
    </div>
  );
};

// Function to calculate Dew Point in Celsius
function calculateDewPoint(temperature, humidity) {
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * temperature) / (b + temperature) + Math.log(humidity / 100);
  const dewPointKelvin = (b * alpha) / (a - alpha);
  const dewPointCelsius = dewPointKelvin - 273.15;
  return dewPointCelsius;
}

export default WeatherInfo;

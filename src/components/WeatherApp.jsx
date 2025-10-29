import { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherApp.css";
import { API_KEY } from "../apikey";


// Base URL for OpenWeatherMap
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function WeatherApp() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchResult();
  }, [city]);

  async function fetchResult() {
    try {
      const response = await axios.get(API_URL, {
        params: { q: city, appid: API_KEY, units: "metric" },
      });
      console.log("Response:", response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchResult}>Search</button>

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

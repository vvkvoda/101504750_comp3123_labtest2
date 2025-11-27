import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import './App.css';

// ✅ YOUR FINALIZED API KEY
const API_KEY = '137ad180b7aefc5eb064fe61db2045bd'; 
const ICON_URL_BASE = 'http://openweathermap.org/img/wn/';

function App() {
  // State for storing the weather data (Use state for managing data)
  const [weatherData, setWeatherData] = useState(null); 
  // State for the city used in the API call
  const [city, setCity] = useState('Toronto'); 
  // State for the input field value
  const [inputCity, setInputCity] = useState('Toronto'); 
  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to fetch weather data (Effects for fetching on load/input change)
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // The API endpoint using units=metric to get Celsius
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      
      const response = await axios.get(url);
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('API Fetch Error:', err);
      // Handle city not found
      if (err.response && err.response.status === 404) {
        setError(`City "${cityName}" not found. Please try again.`);
      } else {
        setError('Failed to fetch weather data. Check API key or connection.');
      }
      setWeatherData(null); // Clear previous data on error
      setLoading(false);
    }
  };

  // useEffect hook to fetch data on initial load and when 'city' changes
  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  // Handle form submission (The Search dynamic content change feature)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim() !== '') {
      setCity(inputCity.trim()); // Trigger useEffect to fetch new data
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
      </header>

      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City Name (e.g., London)"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Get Weather
          </button>
        </form>
      </div>

      <div className="weather-display">
        {loading && <p className="loading">Loading weather data...</p>}
        {error && <p className="error">{error}</p>}
        
        {/* Pass the data to the child component using props */}
        {weatherData && (
          <WeatherCard 
            data={weatherData} 
            iconUrlBase={ICON_URL_BASE}
          />
        )}
      </div>
      
    </div>
  );
}

export default App;
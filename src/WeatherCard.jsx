import React from 'react';
import './WeatherCard.css'; 

function WeatherCard({ data, iconUrlBase }) {
  if (!data) return null;

  // Destructure relevant required information from the API response object
  const { 
    name, 
    main: { temp, temp_min, temp_max, humidity, pressure, feels_like }, 
    weather, 
    wind: { speed }, 
    sys: { country },
    visibility
  } = data;
  
  // Extract condition and icon
  const condition = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = `${iconUrlBase}${iconCode}@2x.png`; // Weather icons URL

  return (
    <div className="weather-card">
      <div className="location-header">
        <h2>{name}, {country}</h2>
        <p>Current Time: {new Date().toLocaleTimeString()}</p>
      </div>
      
      <div className="main-info">
        {/* Weather Icon and Description */}
        <div className="icon-display">
          <img src={iconUrl} alt={condition} />
          <p className="condition-text">{condition}</p>
        </div>
        
        {/* Temperature Display */}
        <p className="temperature">
          {Math.round(temp)}°C 
        </p>
      </div>

      {/* Detailed Information Display */}
      <div className="details-grid">
        <div className="detail-item">
          <strong>Feels Like:</strong> <span>{Math.round(feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <strong>Min Temp:</strong> <span>{Math.round(temp_min)}°C</span>
        </div>
        <div className="detail-item">
          <strong>Max Temp:</strong> <span>{Math.round(temp_max)}°C</span>
        </div>
        <div className="detail-item">
          <strong>Humidity:</strong> <span>{humidity}%</span>
        </div>
        <div className="detail-item">
          <strong>Wind Speed:</strong> <span>{speed} m/s</span>
        </div>
        <div className="detail-item">
          <strong>Pressure:</strong> <span>{pressure} hPa</span>
        </div>
        <div className="detail-item">
          <strong>Visibility:</strong> <span>{visibility / 1000} km</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
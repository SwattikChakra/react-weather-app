import React, { useState } from 'react';
import './App.css';
import Search from './components/search/search';
import WeatherInfo from './components/current_weather/WeatherInfo'; // Import the WeatherInfo component

function App() {
  const [selectedCity, setSelectedCity] = useState(null); // State variables for selected city data

  const handleOnSearchChange = (searchData) => {
    setSelectedCity(searchData); // Store the selected city data in state
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {selectedCity && ( // Render WeatherInfo if a city is selected
        <WeatherInfo
          latitude={selectedCity.value.split(', ')[0]}
          longitude={selectedCity.value.split(', ')[1]}
          apiKey="6da038a74f250ca26bee9f0b22f1f7fc"
        />
      )}
    </div>
  );
}

export default App;

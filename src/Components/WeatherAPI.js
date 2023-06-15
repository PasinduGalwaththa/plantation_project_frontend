import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherAPI = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const API_KEY = '3d4c4d964c2239b7841a1f0d5397c190';

  useEffect(() => {
    console.log('Fetching weather data')
    fetchWeatherDatalocation('Colombo');
    

  }, []);

  const fetchWeatherData = async (lat , lon) => {
    try {
      await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      ).then((response) => {
        console.log(response.data)
      });
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  }

  const fetchWeatherDatalocation = async (locationplace) => {
    try {
      await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${locationplace}&limit=5&appid=${API_KEY}`
      ).then((response) => {
        
        setLocation(
          location.latitude = response.data[0].lat,
          location.longitude = response.data[0].lon
        )
        console.log(location)
        fetchWeatherData(location.latitude, location.longitude);
      });
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather } = weatherData;
  const { temp } = main;
  const { description } = weather[0];

  return (
    <div>
      <h2>{name}</h2>
      <p>Temperature: {temp} K</p>
      <p>Description: {description}</p>
    </div>
  );
};
}
export default WeatherAPI;

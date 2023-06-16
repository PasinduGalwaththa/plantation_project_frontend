import  { useState, useEffect } from 'react'
import axios from 'axios'




const Weather = ({latitude , longitude}) => {
    const [weatherData, setWeatherData] = useState(
        { name : '',
          temp : 0,
          description : '',
          icon : '',
      }
    )
    const API_KEY = '3d4c4d964c2239b7841a1f0d5397c190';
  
    const getWeather =  (lat , lan ) =>  {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lan}&appid=${API_KEY}&units=metric`)
        .then(response => {
          setWeatherData(
            { name : response.data.name,
              temp : response.data.main.temp,
              description : response.data.weather[0].description,
              icon : response.data.weather[0].icon,
            }
          )
          console.log(weatherData)
        }).catch(error => {
          console.log(error)
        })}

        useEffect(() => {
            if (latitude && longitude) {
                getWeather(latitude, longitude)
            }
        }, [latitude, longitude])

    
    return (
      <div>
        <h1>Weather eka</h1>
        {weatherData.name && 
        <>
        <p>City: {weatherData.name}</p>
        <p>Temperature: {weatherData.temp}°C</p>
        <p>Description: {weatherData.description}</p>
        <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt="weather icon" />
        
        </>
        }
        
      </div>
    )
  }

    export default Weather;
import  { useState, useEffect } from 'react'
import axios from 'axios'




const Weather = ({latitude , longitude}) => {
    const [weatherData, setWeatherData] = useState(
        { name : '',
          temp : 0,
          weather1 : '',
          icon : '',
          wind : '',
      }
    )
    const API_KEY = '3d4c4d964c2239b7841a1f0d5397c190';
  
    const getWeather =  (lat , lon ) =>  {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(response => {
          
          

          
         
          
          setWeatherData(
            { name : response.data.city.name,
              temp :  response.data.list[0].main.temp,
              weather1 : response.data.list[0].weather[0].description,

              icon : response.data.list[0].weather[0].icon,
              wind : response.data.list[0].wind.speed.toFixed(2),

              
              
            }
          )
          console.log(response.data) 
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
        <h1>Weather</h1>

        <div className='todayweather'>
        {weatherData.name && 
        <>
        <p>City: {weatherData.name}</p>
        <p>Temperature: {weatherData.temp}°C</p>
        <p>weather: {weatherData.weather1}</p>
        <p>wind: {weatherData.wind*3.6}(km/h)</p>
        
        <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt="weather icon" />
        
        </>
        }

        

        </div>
       
        
      </div>
    )
  }

    export default Weather;
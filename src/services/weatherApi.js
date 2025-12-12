const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    return {
      current: {
        temp: Math.round(data.current.temp),
        feels_like: Math.round(data.current.feels_like),
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        sunrise: new Date(data.current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(data.current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      daily: data.daily.slice(1, 6).map(day => ({
        date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp_min: Math.round(day.temp.min),
        temp_max: Math.round(day.temp.max),
        icon: day.weather[0].icon,
        description: day.weather[0].description
      }))
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
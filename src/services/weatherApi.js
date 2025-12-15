const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export const getWeatherData = async (lat, lon) => {
  try {
    if (!lat || !lon) {
      throw new Error('Coordinates are required for weather data')
    }
    
    if (!WEATHER_API_KEY || WEATHER_API_KEY === '11845b16191d4e970987e59662f49847') {
      throw new Error('OpenWeatherMap API key not configured. Add VITE_OPENWEATHER_API_KEY to .env file.')
    }
    
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Weather API error ${response.status}: ${errorText}`)
    }
    
    const data = await response.json()
    
    if (!data.current || !data.daily) {
      throw new Error('Invalid weather data received from API')
    }
    
    return {
      current: {
        temp: Math.round(data.current.temp),
        feels_like: Math.round(data.current.feels_like),
        humidity: data.current.humidity,
        pressure: data.current.pressure,
        wind_speed: data.current.wind_speed,
        wind_deg: data.current.wind_deg,
        description: data.current.weather[0]?.description || 'Clear',
        icon: data.current.weather[0]?.icon || '01d',
        sunrise: new Date(data.current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(data.current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        uvi: data.current.uvi,
        visibility: data.current.visibility ? Math.round(data.current.visibility / 1000) + ' km' : 'N/A'
      },
      daily: data.daily.slice(1, 6).map(day => ({
        date: new Date(day.dt * 1000),
        dayOfWeek: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp_min: Math.round(day.temp.min),
        temp_max: Math.round(day.temp.max),
        temp_day: Math.round(day.temp.day),
        temp_night: Math.round(day.temp.night),
        icon: day.weather[0]?.icon || '01d',
        description: day.weather[0]?.description || 'Clear',
        pop: Math.round(day.pop * 100) 
      }))
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message)
    throw error 
  }
}

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
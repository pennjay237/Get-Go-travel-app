import { formatTemperature } from '../../utils/formatTemp'

const WeatherCard = ({ weather }) => {
  if (!weather) return null

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01': '☀️',
      '02': '⛅',
      '03': '☁️',
      '04': '☁️',
      '09': '🌧️',
      '10': '🌦️',
      '11': '⛈️',
      '13': '❄️',
      '50': '🌫️'
    }
    return iconMap[iconCode.slice(0, 2)] || '🌡️'
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{getWeatherIcon(weather.icon)}</span>
            <div>
              <div className="text-5xl font-bold">{formatTemperature(weather.temp)}</div>
              <div className="text-xl capitalize">{weather.description}</div>
            </div>
          </div>
          <div className="mt-4 text-lg">Feels like {formatTemperature(weather.feels_like)}</div>
        </div>
        
        <div className="text-right">
          <div className="text-sm opacity-90">Sunrise: {weather.sunrise}</div>
          <div className="text-sm opacity-90">Sunset: {weather.sunset}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
          <div className="text-sm opacity-90">Humidity</div>
          <div className="text-2xl font-bold">{weather.humidity}%</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
          <div className="text-sm opacity-90">Wind</div>
          <div className="text-2xl font-bold">{weather.wind_speed} m/s</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
          <div className="text-sm opacity-90">High</div>
          <div className="text-2xl font-bold">{formatTemperature(weather.temp + 3)}</div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
          <div className="text-sm opacity-90">Low</div>
          <div className="text-2xl font-bold">{formatTemperature(weather.temp - 3)}</div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
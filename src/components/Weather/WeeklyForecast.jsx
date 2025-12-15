import { formatTemperature } from '../../utils/formatTemp'

const WeeklyForecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null

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
    <div>
      <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="font-medium mb-2">{day.date}</div>
            <div className="text-3xl mb-2">{getWeatherIcon(day.icon)}</div>
            <div className="text-sm text-gray-600 mb-1 capitalize">{day.description}</div>
            <div className="flex justify-center space-x-2">
              <span className="font-bold text-gray-900">{formatTemperature(day.temp_max)}</span>
              <span className="text-gray-500">{formatTemperature(day.temp_min)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyForecast
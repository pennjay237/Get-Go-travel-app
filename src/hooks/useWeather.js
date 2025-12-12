import { useState, useEffect } from 'react'
import { getWeatherData } from '../services/weatherApi'

export const useWeather = (coordinates) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!coordinates) return

    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await getWeatherData(coordinates.lat, coordinates.lng)
        setWeather(data)
      } catch (err) {
        setError(err.message)
        console.error('Error in useWeather:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [coordinates])

  return { weather, loading, error }
}
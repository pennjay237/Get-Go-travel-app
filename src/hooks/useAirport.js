import { useState, useEffect } from 'react'
import { getNearestAirport } from '../services/airportApi'

export const useAirport = (coordinates) => {
  const [airport, setAirport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!coordinates) return

    const fetchAirport = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await getNearestAirport(coordinates.lat, coordinates.lng)
        setAirport(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAirport()
  }, [coordinates])

  return { airport, loading, error }
}
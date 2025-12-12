import { useState, useEffect } from 'react'
import { getTours } from '../services/toursApi'

export const useTours = (locationName) => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!locationName) return

    const fetchTours = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await getTours(locationName)
        setTours(data)
      } catch (err) {
        setError(err.message)
        setTours([])
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [locationName])

  return { tours, loading, error }
}
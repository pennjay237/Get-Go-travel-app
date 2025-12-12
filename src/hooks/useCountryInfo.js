import { useState, useEffect } from 'react'
import { getCountryInfo } from '../services/countryApi'

export const useCountryInfo = (locationName) => {
  const [countryInfo, setCountryInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!locationName) return

    const fetchCountryInfo = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const countryName = locationName.split(',').pop().trim()
        const data = await getCountryInfo(countryName)
        setCountryInfo(data)
      } catch (err) {
        setError(err.message)
        setCountryInfo({
          name: locationName,
          languages: 'N/A',
          currency: 'N/A'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCountryInfo()
  }, [locationName])

  return { countryInfo, loading, error }
}
import { useState, useEffect } from 'react'
import { getAttractions } from '../services/attractionsApi'

export const useAttractions = (coordinates) => {
  const [attractions, setAttractions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    if (!coordinates || loading) return
    
    setLoading(true)
    try {
      const newAttractions = await getAttractions(
        coordinates.lat, 
        coordinates.lng, 
        attractions.length + 5
      )
      
      if (newAttractions.length <= attractions.length) {
        setHasMore(false)
      }
      
      setAttractions(newAttractions)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (coordinates) {
      loadMore()
    }
  }, [coordinates])

  return { attractions, loading, error, hasMore, loadMore }
}
const AIRPORT_API_URL = import.meta.env.VITE_AIRPORT_API_URL
const AIRPORT_API_KEY = import.meta.env.VITE_AIRPORT_API_KEY

export const getNearestAirport = async (lat, lon) => {
  try {
    const response = await fetch(
      `${AIRPORT_API_URL}?lat=${lat}&lon=${lon}&radius=100`,
      {
        headers: {
          'X-Api-Key': AIRPORT_API_KEY
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Airport API error')
    }
    
    const airports = await response.json()
    
    if (airports.length === 0) {
      return {
        name: 'No airport found',
        iata: 'N/A',
        city: 'N/A',
        country: 'N/A',
        distance: 'N/A'
      }
    }
    
    const nearestAirport = airports.reduce((nearest, airport) => {
      return airport.distance < nearest.distance ? airport : nearest
    })
    
    return {
      name: nearestAirport.name,
      iata: nearestAirport.iata || 'N/A',
      city: nearestAirport.city || 'N/A',
      country: nearestAirport.country || 'N/A',
      distance: Math.round(nearestAirport.distance)
    }
  } catch (error) {
    console.error('Error fetching airport data:', error)
    return {
      name: 'Airport information unavailable',
      iata: 'N/A',
      city: 'N/A',
      country: 'N/A',
      distance: 'N/A'
    }
  }
}
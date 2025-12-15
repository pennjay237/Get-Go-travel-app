const AIRPORT_API_URL = import.meta.env.VITE_AIRPORT_API_URL || 'https://api.api-ninjas.com/v1/airports'
const AIRPORT_API_KEY = import.meta.env.VITE_AIRPORT_API_KEY

export const getNearestAirport = async (lat, lon) => {
  try {
    if (!lat || !lon || lat === 0 || lon === 0) {
      throw new Error('Invalid coordinates provided')
    }
    
    if (!AIRPORT_API_KEY || AIRPORT_API_KEY === 'your_api_ninjas_key_here') {
      throw new Error('API Ninjas key not configured')
    }
    
    const response = await fetch(
      `${AIRPORT_API_URL}?lat=${lat}&lon=${lon}&radius=200`, // Increased radius
      {
        headers: {
          'X-Api-Key': AIRPORT_API_KEY
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Airport API error: ${response.status}`)
    }
    
    const airports = await response.json()
    
    if (!Array.isArray(airports) || airports.length === 0) {
      throw new Error('No airports found near this location')
    }
    
    const nearestAirport = airports.reduce((nearest, airport) => {
      return airport.distance < nearest.distance ? airport : nearest
    })
    
    return {
      name: nearestAirport.name || 'Unknown Airport',
      iata: nearestAirport.iata || 'N/A',
      city: nearestAirport.city || 'N/A',
      country: nearestAirport.country || 'N/A',
      distance: Math.round(nearestAirport.distance) || 'N/A'
    }
  } catch (error) {
    console.error('Error fetching airport data:', error.message)
    throw error 
  }
}
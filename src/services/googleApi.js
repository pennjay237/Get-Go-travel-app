const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY

export const searchPlaces = async (query) => {
  try {
    if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'your_google_places_api_key_here') {
      throw new Error('Google Places API key not configured. Add VITE_GOOGLE_PLACES_API_KEY to .env file.')
    }
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&types=(cities)&language=en`
    )
    
    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.status === 'REQUEST_DENIED') {
      throw new Error('Google Places API request denied. Check your API key and billing.')
    }
    
    if (data.status === 'ZERO_RESULTS') {
      throw new Error('No places found matching your search.')
    }
    
    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No predictions returned from Google Places API.')
    }
    
    return data.predictions.map(pred => ({
      id: pred.place_id,
      name: pred.description,
      type: pred.types?.[0] || 'location'
    }))
  } catch (error) {
    console.error('Google Places API error:', error.message)
    throw error 
  }
}

export const getPlaceDetails = async (placeId) => {
  try {
    if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'your_google_places_api_key_here') {
      throw new Error('Google Places API key not configured')
    }
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,address_components,types&key=${GOOGLE_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error(`Place details API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.status !== 'OK') {
      throw new Error(`Google Places details error: ${data.status}`)
    }
    
    const result = data.result
    
    return {
      name: result.name || 'Unknown Location',
      address: result.formatted_address || 'Address not available',
      lat: result.geometry?.location?.lat || null,
      lng: result.geometry?.location?.lng || null,
      country: extractCountryFromAddress(result.address_components),
      types: result.types || []
    }
  } catch (error) {
    console.error('Place details error:', error.message)
    throw error 
  }
}

const extractCountryFromAddress = (addressComponents) => {
  if (!addressComponents) return null
  
  const countryComponent = addressComponents.find(component => 
    component.types.includes('country')
  )
  
  return countryComponent?.long_name || null
}
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY

export const searchPlaces = async (query) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&types=(cities)`
    )
    const data = await response.json()
    return data.predictions.map(pred => ({
      id: pred.place_id,
      name: pred.description
    }))
  } catch (error) {
    console.error('Error searching places:', error)
    throw error
  }
}

export const getPlaceDetails = async (placeId) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,geometry,formatted_address&key=${GOOGLE_API_KEY}`
    )
    const data = await response.json()
    return {
      name: data.result.name,
      lat: data.result.geometry.location.lat,
      lng: data.result.geometry.location.lng,
      address: data.result.formatted_address
    }
  } catch (error) {
    console.error('Error getting place details:', error)
    throw error
  }
}
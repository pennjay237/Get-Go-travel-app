const KEY = import.meta.env.VITE_GEOAPIFY_KEY

export const getNearbyPlaces = async (lat, lon, category) => {
  const res = await fetch(
    `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},20000&limit=5&apiKey=${KEY}`
  )
  const data = await res.json()
  return data.features
}

export const getNearestAirport = async (lat, lon) => {
  const places = await getNearbyPlaces(lat, lon, 'airport')
  return places[0]?.properties
}

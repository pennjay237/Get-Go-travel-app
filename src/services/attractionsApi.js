const SYGIC_API_KEY = import.meta.env.VITE_SYGIC_TRAVEL_API_KEY

export const getAttractions = async (lat, lon, limit = 10) => {
  try {
    const response = await fetch(
      `https://travel.sygic.com/api/v1/places?lat=${lat}&lon=${lon}&radius=20000&limit=${limit}&categories=sightseeing&api_key=${SYGIC_API_KEY}`
    )
    
    if (!response.ok) {
      console.warn('Sygic API failed, using mock data')
      return getMockAttractions()
    }
    
    const data = await response.json()
    
    return data.places.map(place => ({
      id: place.id,
      name: place.name,
      description: place.perex || 'No description available',
      rating: place.rating || 4.0,
      image: place.thumbnail_url || '/placeholder-image.jpg',
      category: place.category.name || 'Attraction'
    }))
  } catch (error) {
    console.error('Error fetching attractions:', error)
    return getMockAttractions()
  }
}

const getMockAttractions = () => {
  return [
    {
      id: 1,
      name: "City Center",
      description: "The heart of the city with historic architecture",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      category: "Landmark"
    },
    {
      id: 2,
      name: "Central Park",
      description: "Beautiful urban park perfect for relaxation",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w-400&h=300&fit=crop",
      category: "Park"
    }
  ]
}
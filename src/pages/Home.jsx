import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar/SearchBar'
import { searchPlaces, getPlaceDetails } from '../services/googleApi'

const heroImages = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop',
]

const Home = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)]

  const handleSearch = async (query) => {
    if (!query.trim()) return
    
    setLoading(true)
    try {
      const places = await searchPlaces(query)
      if (places.length > 0) {
        const placeDetails = await getPlaceDetails(places[0].id)
        navigate(`/destination/${encodeURIComponent(placeDetails.name)}`, {
          state: { 
            location: placeDetails,
            coordinates: { lat: placeDetails.lat, lng: placeDetails.lng }
          }
        })
      }
    } catch (error) {
      console.error('Search error:', error)
      alert('Failed to find destination. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${randomImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-6">
            Plan Your Next Adventure
          </h1>
          <p className="text-xl text-white text-center mb-10 max-w-2xl">
            Get everything you need for your trip in one place - weather, attractions, currency, and more
          </p>
          
          <div className="w-full max-w-2xl">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need For Your Trip</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Weather Forecast</h3>
              <p className="text-gray-600">Get current conditions and weekly forecasts for your destination</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Attractions</h3>
              <p className="text-gray-600">Discover must-see places with photos and descriptions</p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Currency Exchange</h3>
              <p className="text-gray-600">Real-time exchange rates and conversion calculator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
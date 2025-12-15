import TourCard from './TourCard'
import Loader from '../UI/Loader'

const ToursList = ({ tours, loading, error }) => {
  if (loading) {
    return <Loader message="Loading tours..." />
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Unable to load tours at the moment.</p>
        <p className="text-sm text-gray-500">Showing sample tours instead</p>
      </div>
    )
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No tours available for this destination.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}

export default ToursList
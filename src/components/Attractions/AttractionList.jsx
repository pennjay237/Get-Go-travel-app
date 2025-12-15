import AttractionCard from './AttractionCard'
import Loader from '../UI/Loader'

const AttractionsList = ({ attractions, loading, hasMore, onLoadMore }) => {
  if (loading && attractions.length === 0) {
    return <Loader message="Loading attractions..." />
  }

  if (attractions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No attractions found for this destination.
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
      
      {hasMore && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Load More Attractions'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AttractionsList
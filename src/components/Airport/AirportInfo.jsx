import Loader from '../UI/Loader'

const AirportInfo = ({ airport, loading, error }) => {
  if (loading) {
    return <Loader message="Finding nearest airport..." />
  }

  if (error || !airport) {
    return (
      <div className="text-center py-4 text-gray-600">
        Airport information unavailable
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="text-3xl mr-3">✈️</span>
        <div>
          <div className="text-sm text-gray-600">Nearest Airport</div>
          <div className="text-lg font-bold text-gray-900">{airport.name}</div>
        </div>
      </div>

      <div className="space-y-3">
        {airport.iata && airport.iata !== 'N/A' && (
          <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">IATA Code</span>
            <span className="font-medium bg-white px-3 py-1 rounded-full border">
              {airport.iata}
            </span>
          </div>
        )}
        
        {airport.city && airport.city !== 'N/A' && (
          <div className="flex justify-between">
            <span className="text-gray-600">City</span>
            <span className="font-medium">{airport.city}</span>
          </div>
        )}
        
        {airport.country && airport.country !== 'N/A' && (
          <div className="flex justify-between">
            <span className="text-gray-600">Country</span>
            <span className="font-medium">{airport.country}</span>
          </div>
        )}
        
        {airport.distance && airport.distance !== 'N/A' && (
          <div className="flex justify-between">
            <span className="text-gray-600">Distance</span>
            <span className="font-medium">{airport.distance} km</span>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        This is the closest major airport to your destination.
      </div>
    </div>
  )
}

export default AirportInfo
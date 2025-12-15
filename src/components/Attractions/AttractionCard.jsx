const AttractionCard = ({ attraction }) => {
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>)
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>)
    }
    
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">⭐</span>)
    }
    
    return stars
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop'
          }}
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-800">{attraction.category}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {attraction.name}
          </h3>
          <div className="flex items-center">
            {renderStars(attraction.rating)}
            <span className="ml-1 text-sm font-medium text-gray-600">{attraction.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 line-clamp-2 mb-4">
          {attraction.description}
        </p>
        
        <button className="w-full btn-secondary text-sm py-2">
          View Details
        </button>
      </div>
    </div>
  )
}

export default AttractionCard
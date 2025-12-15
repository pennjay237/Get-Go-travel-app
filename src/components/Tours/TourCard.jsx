const TourCard = ({ tour }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<span key={i}>⭐</span>)
      } else {
        stars.push(<span key={i} className="text-gray-300">⭐</span>)
      }
    }
    return stars
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
          }}
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-800">{tour.category}</span>
        </div>
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary-600">${tour.price}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {tour.name}
          </h3>
          <div className="flex items-center">
            {renderStars(tour.rating)}
            <span className="ml-1 text-sm font-medium text-gray-600">{tour.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 line-clamp-2 mb-3">
          {tour.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500"> {tour.duration}</span>
          <span className="text-sm font-medium text-gray-700">From ${tour.price}/person</span>
        </div>
        
        <a
          href={tour.bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full btn-primary text-center text-sm py-2"
        >
          Book Now
        </a>
      </div>
    </div>
  )
}

export default TourCard
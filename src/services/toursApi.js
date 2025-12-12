// Mock tour data since Viator API requires business verification
export const getTours = async (location) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const mockTours = [
    {
      id: 1,
      name: "City Highlights Walking Tour",
      description: "Explore the main attractions with a local guide",
      price: 45,
      duration: "3 hours",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      category: "Walking Tour"
    },
    {
      id: 2,
      name: "Food Tasting Experience",
      description: "Taste local cuisine at hidden gems",
      price: 65,
      duration: "4 hours",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "Food Tour"
    },
    {
      id: 3,
      name: "Sunset Boat Cruise",
      description: "Enjoy panoramic views from the water",
      price: 85,
      duration: "2 hours",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop",
      category: "Boat Tour"
    }
  ]
  
  return mockTours.map(tour => ({
    ...tour,
    bookingLink: `https://example.com/book/${tour.id}?location=${encodeURIComponent(location)}`
  }))
}
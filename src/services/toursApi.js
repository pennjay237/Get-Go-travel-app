const EVENTBRITE_API_KEY = import.meta.env.VITE_EVENTBRITE_API_KEY

export const getTours = async (location, lat, lon) => {
  try {
    if (!location || !lat || !lon) {
      throw new Error('Location and coordinates are required for tours')
    }
    
    if (!EVENTBRITE_API_KEY || EVENTBRITE_API_KEY === 'your_eventbrite_api_key_here') {
      return await getLocalActivities(location, lat, lon)
    }
    
    const response = await fetch(
      `https://www.eventbriteapi.com/v3/events/search/?location.latitude=${lat}&location.longitude=${lon}&location.within=50km&expand=venue&token=${EVENTBRITE_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error(`Eventbrite API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.events || data.events.length === 0) {
      throw new Error('No events/tours found for this location')
    }
    
    return data.events.slice(0, 6).map(event => ({
      id: event.id,
      name: event.name?.text || 'Untitled Event',
      description: event.description?.text?.substring(0, 150) + '...' || 'No description available',
      price: event.is_free ? 'Free' : `From $${event.ticket_availability?.minimum_ticket_price?.major_value || 0}`,
      duration: `${event.venue?.address?.localized_address_display || location}`,
      rating: 4.5,
      image: event.logo?.url || `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop`,
      category: event.category?.name || 'Tour',
      bookingLink: event.url || `https://www.eventbrite.com/e/${event.id}`
    }))
  } catch (error) {
    console.error('Error fetching tours:', error.message)
    return await getLocalActivities(location, lat, lon)
  }
}

const getLocalActivities = async (location, lat, lon) => {
  const activities = [
    {
      id: 1,
      name: `Guided ${location.split(',')[0]} City Tour`,
      description: `Explore the highlights of ${location.split(',')[0]} with a knowledgeable local guide`,
      price: 45,
      duration: "3-4 hours",
      rating: 4.8,
      image: `https://source.unsplash.com/400x300/?${encodeURIComponent(location.split(',')[0])},tour`,
      category: "Walking Tour",
      bookingLink: `https://www.viator.com/searchResults/all?text=${encodeURIComponent(location)}`
    },
    {
      id: 2,
      name: "Local Food & Market Experience",
      description: "Taste authentic local cuisine and visit traditional markets",
      price: 65,
      duration: "4 hours",
      rating: 4.9,
      image: `https://source.unsplash.com/400x300/?${encodeURIComponent(location.split(',')[0])},food`,
      category: "Food Tour",
      bookingLink: `https://www.viator.com/searchResults/all?text=${encodeURIComponent(location)}+food+tour`
    }
  ]
  
  return activities
}
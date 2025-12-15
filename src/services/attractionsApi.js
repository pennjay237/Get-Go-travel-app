const OPENTRIPMAP_API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY

export const getAttractions = async (lat, lon, limit = 10, radius = 20000) => {
  try {
    if (!lat || !lon || lat === 0 || lon === 0) {
      throw new Error('Invalid coordinates for attractions')
    }
    
    const response = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&limit=${limit}&apikey=${OPENTRIPMAP_API_KEY || '5ae2e3f221c38a28845f05b6e7187f5f0b7d7a7d'}`
    )
    
    if (!response.ok) {
      throw new Error(`Attractions API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.features || data.features.length === 0) {
      throw new Error('No attractions found for this location')
    }
    
    return await Promise.all(
      data.features.slice(0, limit).map(async (feature) => {
        const xid = feature.properties.xid
        let details = {}
        
        try {
          const detailsResponse = await fetch(
            `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${OPENTRIPMAP_API_KEY || '5ae2e3f221c38a28845f05b6e7187f5f0b7d7a7d'}`
          )
          if (detailsResponse.ok) {
            details = await detailsResponse.json()
          }
        } catch (detailsError) {
          console.warn(`Could not fetch details for ${xid}:`, detailsError.message)
        }
        
        return {
          id: xid,
          name: feature.properties.name || 'Unnamed Attraction',
          description: details.wikipedia_extracts?.text || 
                      details.info?.descr || 
                      'No description available',
          rating: details.rate || 4.0,
          image: details.preview?.source || 
                details.image || 
                `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&q=80`,
          category: feature.properties.kinds?.split(',')[0]?.replace(/_/g, ' ') || 'Attraction',
          distance: feature.properties.dist ? Math.round(feature.properties.dist) + ' km' : 'Nearby'
        }
      })
    )
  } catch (error) {
    console.error('Error fetching attractions:', error.message)
    throw error 
  }
}
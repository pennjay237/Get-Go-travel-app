import axios from "axios";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function getAttractionsByCity(city) {
  if (!city) throw new Error("City is required");

  try {
    const response = await axios.get(
      `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=city:${encodeURIComponent(
        city
      )}&limit=20&apiKey=${GEOAPIFY_API_KEY}`
    );

    return response.data.features.map((place) => ({
      id: place.properties.place_id,
      name: place.properties.name,
      address: place.properties.address_line1,
      image: place.properties.image, 
      rating: place.properties.rating || null,
      description: place.properties.description || "",
      coordinates: place.geometry.coordinates,
    }));
  } catch (error) {
    console.error("Attractions API error:", error);
    throw error;
  }
}

import axios from "axios";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export const getNearestAirport = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.geoapify.com/v1/places`,
      {
        params: {
          categories: "transport.airport",
          filter: `circle:${lon},${lat},50000`, 
          limit: 1,
          apiKey: GEOAPIFY_API_KEY,
        },
      }
    );

    if (response.data.features.length === 0) return null;

    const airport = response.data.features[0].properties;
    return {
      name: airport.name,
      city: airport.city,
      country: airport.country,
      iata: airport.iata,
    };
  } catch (error) {
    console.error("Airport API error:", error);
    return null;
  }
};

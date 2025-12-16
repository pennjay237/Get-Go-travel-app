import axios from "axios";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export const getAttractionsByCity = async (cityName) => {
  try {
    const response = await axios.get(
      "https://api.geoapify.com/v2/places",
      {
        params: {
          categories: "tourism.sights",
          filter: `place:${cityName}`,
          limit: 10,
          apiKey: GEOAPIFY_API_KEY,
        },
      }
    );

    return response.data.features.map((feature) => ({
      name: feature.properties.name,
      address: feature.properties.address_line1,
      category: feature.properties.categories
        ? feature.properties.categories[0]
        : "",
    }));
  } catch (error) {
    console.error("Attractions API error:", error);
    return [];
  }
};

import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "../utils/debounce";

export default function useGeoapifySearch(query) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return setSuggestions([]);

    const fetchSuggestions = debounce(async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete`,
          {
            params: {
              text: query,
              apiKey: import.meta.env.VITE_GEOAPIFY_KEY,
              limit: 5,
            },
          }
        );
        setSuggestions(res.data.features.map((f) => ({
          place_id: f.properties.place_id,
          formatted: f.properties.formatted,
          lat: f.properties.lat,
          lon: f.properties.lon
        })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    fetchSuggestions();
  }, [query]);

  return { suggestions, loading };
}

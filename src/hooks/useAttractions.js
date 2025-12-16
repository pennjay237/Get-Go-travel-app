import { useState, useEffect } from "react";
import { getAttractionsByCity } from "../services/attractionApi";

export default function useAttractions(destination) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination) return;

    const fetchAttractions = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAttractionsByCity(destination);
        setAttractions(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch attractions");
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [destination]);

  return { attractions, loading, error };
}

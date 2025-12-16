import { useState, useEffect } from "react";
import { getCountryInfo } from "../services/countryApi";

export default function useCountryInfo(destination) {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination) return;

    const fetchCountryInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCountryInfo(destination);
        setLanguages(data?.languages || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch country info");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [destination]);

  return { languages, loading, error };
}

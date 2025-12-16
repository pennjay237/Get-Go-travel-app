import { useState, useEffect } from "react";
import { getCurrencyInfo } from "../services/currencyApi";

export default function useCurrency(destination) {
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination) return;

    const fetchCurrency = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCurrencyInfo(destination);
        setCurrency(data || null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch currency info");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, [destination]);

  return { currency, loading, error };
}


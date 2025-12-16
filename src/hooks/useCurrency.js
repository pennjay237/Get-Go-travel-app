import { useState, useEffect } from "react";
import { getCurrencyInfo } from "../services/currencyApi";

export default function useCurrency(destination) {
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination || !destination.country) return;

    const fetchCurrency = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCurrencyInfo(destination.country);
        setCurrency(data.currency);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch currency");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, [destination]);

  return { currency, loading, error };
}

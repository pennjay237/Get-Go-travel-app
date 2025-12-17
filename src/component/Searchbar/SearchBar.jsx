import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGeocode } from "../../hooks/geoapify";

export default function SearchBar({ onSelectDestination }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchGeocode(query.trim());

      if (!result) {
        setError("Location not found. Try another city.");
        return;
      }

      if (onSelectDestination) {
        onSelectDestination({
          lat: result.lat,
          lon: result.lon,
          city: result.city,
          country: result.country,
          countryCode: result.countryCode,
        });
      }

      navigate("/search", {
        state: {
          lat: result.lat,
          lon: result.lon,
          city: result.city,
          country: result.country,
          countryCode: result.countryCode,
        },
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a destination (e.g. Paris, Tokyo)"
          className="
            flex-1
            rounded-xl
            border border-gray-300 dark:border-gray-700
            px-4 py-3
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            transition-colors
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            px-6 py-3
            text-sm font-medium
            text-white
            bg-blue-600 hover:bg-blue-700
            dark:bg-blue-500 dark:hover:bg-blue-600
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition-colors
          "
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <div className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2 transition-colors">
          {error}
        </div>
      )}
    </div>
  );
}
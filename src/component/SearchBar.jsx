import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGeocode } from "../hooks/geoapify";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSearch(e) {
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
  }

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
            border border-slate-300
            px-4 py-3
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            bg-white
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
            bg-blue-600
            hover:bg-blue-700
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition
          "
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && (
        <div className="mt-3 text-sm text-rose-600 bg-rose-50 rounded-lg px-4 py-2">
          {error}
        </div>
      )}
    </div>
  );
}

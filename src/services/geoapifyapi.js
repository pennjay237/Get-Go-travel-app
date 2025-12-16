const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export async function searchPlaces(query) {
  if (!query) return [];
  const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${GEOAPIFY_KEY}`);
  if (!res.ok) throw new Error("Geoapify API error");
  const data = await res.json();
  return data.features || [];
}

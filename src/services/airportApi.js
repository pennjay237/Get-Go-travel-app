export async function getNearestAirport(lat, lon) {
  if (!lat || !lon) return null;
  const res = await fetch(`https://api.example.com/nearest-airport?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Airport API error");
  return res.json();
}

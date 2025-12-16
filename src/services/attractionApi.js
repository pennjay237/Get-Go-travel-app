export async function getAttractionsByCity(city) {
  if (!city) return [];
  const url = `https://api.example.com/attractions?city=${encodeURIComponent(city)}`; 
  const res = await fetch(url);
  if (!res.ok) throw new Error("Attractions API error");
  return res.json();
}

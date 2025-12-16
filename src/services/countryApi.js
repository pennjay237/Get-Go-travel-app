export async function getCountryInfo(countryCode) {
  if (!countryCode) return {};
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
  if (!res.ok) throw new Error("Country API error");
  const data = await res.json();
  return {
    currency: data[0]?.currencies ? Object.values(data[0].currencies)[0].name : null,
    languages: data[0]?.languages ? Object.values(data[0].languages) : [],
  };
}

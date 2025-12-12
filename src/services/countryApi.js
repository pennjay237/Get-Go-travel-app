const RESTCOUNTRIES_URL = import.meta.env.VITE_RESTCOUNTRIES_API_URL

export const getCountryInfo = async (countryName) => {
  try {
    const response = await fetch(`${RESTCOUNTRIES_URL}/name/${countryName}?fullText=true`)
    
    if (!response.ok) {
      throw new Error('Country not found')
    }
    
    const data = await response.json()
    const country = data[0]
    
    return {
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      languages: Object.values(country.languages || {}).join(', '),
      currency: Object.keys(country.currencies || {})[0] || 'N/A',
      currencyName: country.currencies ? Object.values(country.currencies)[0].name : 'N/A',
      flag: country.flags.png,
      population: country.population?.toLocaleString() || 'N/A',
      region: country.region || 'N/A'
    }
  } catch (error) {
    console.error('Error fetching country info:', error)
    return {
      name: countryName,
      capital: 'N/A',
      languages: 'N/A',
      currency: 'N/A',
      currencyName: 'N/A',
      flag: '',
      population: 'N/A',
      region: 'N/A'
    }
  }
}
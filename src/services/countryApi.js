const RESTCOUNTRIES_URL = import.meta.env.VITE_RESTCOUNTRIES_API_URL || 'https://restcountries.com/v3.1'

export const getCountryInfo = async (countryName) => {
  try {
    if (!countryName || countryName.trim() === '') {
      throw new Error('Country name is required')
    }
    
    const response = await fetch(`${RESTCOUNTRIES_URL}/name/${encodeURIComponent(countryName)}?fullText=true`)
    
    if (!response.ok) {
      throw new Error(`Country API error: ${response.status} - ${countryName} not found`)
    }
    
    const data = await response.json()
    
    if (!data || data.status === 404 || data.length === 0) {
      throw new Error(`Country "${countryName}" not found`)
    }
    
    const country = data[0]
    
    return {
      name: country.name?.common || countryName,
      capital: country.capital?.[0] || 'N/A',
      languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
      currency: country.currencies ? Object.keys(country.currencies)[0] : 'N/A',
      currencyName: country.currencies ? Object.values(country.currencies)[0].name : 'N/A',
      currencySymbol: country.currencies ? Object.values(country.currencies)[0].symbol : '',
      flag: country.flags?.png || country.flags?.svg || '',
      population: country.population?.toLocaleString() || 'N/A',
      region: country.region || 'N/A',
      subregion: country.subregion || 'N/A',
      timezones: country.timezones?.[0] || 'N/A'
    }
  } catch (error) {
    console.error('Error fetching country info:', error.message)
    throw error 
  }
}
const EXCHANGE_API_URL = import.meta.env.VITE_EXCHANGERATE_API_URL

export const getExchangeRates = async (baseCurrency) => {
  try {
    const response = await fetch(`${EXCHANGE_API_URL}/latest/${baseCurrency}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates')
    }
    
    const data = await response.json()
    return {
      base: data.base,
      rates: data.rates,
      date: data.date
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    return {
      base: baseCurrency,
      rates: {
        USD: 1.0,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.0
      },
      date: new Date().toISOString().split('T')[0]
    }
  }
}

export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return null
  
  const amountInBase = amount / rates[fromCurrency]
  return amountInBase * rates[toCurrency]
}
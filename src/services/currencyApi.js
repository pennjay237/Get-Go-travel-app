const EXCHANGE_API_URL = import.meta.env.VITE_EXCHANGERATE_API_URL || 'https://api.exchangerate-api.com/v4'

export const getExchangeRates = async (baseCurrency = 'USD') => {
  try {
    if (!baseCurrency || baseCurrency === 'N/A') {
      throw new Error('Base currency is required')
    }
    
    const response = await fetch(`${EXCHANGE_API_URL}/latest/${baseCurrency}`)
    
    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.rates) {
      throw new Error('Invalid exchange rate data received')
    }
    
    return {
      base: data.base,
      rates: data.rates,
      date: data.date
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message)
    throw error 
  }
}

export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
    throw new Error('Invalid currency or rates data for conversion')
  }
  
  const amountInBase = amount / rates[fromCurrency]
  const convertedAmount = amountInBase * rates[toCurrency]
  
  return parseFloat(convertedAmount.toFixed(2))
}
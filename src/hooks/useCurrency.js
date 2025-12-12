import { useState, useEffect } from 'react'
import { getExchangeRates, convertCurrency } from '../services/currencyApi'

export const useCurrency = (baseCurrency) => {
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!baseCurrency || baseCurrency === 'N/A') return

    const fetchRates = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await getExchangeRates(baseCurrency)
        setRates(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [baseCurrency])

  const convert = (amount, fromCurrency, toCurrency) => {
    if (!rates) return null
    return convertCurrency(amount, fromCurrency, toCurrency, rates.rates)
  }

  return { rates, loading, error, convert }
}
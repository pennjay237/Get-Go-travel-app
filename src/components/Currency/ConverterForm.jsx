import { useState, useEffect } from 'react'
import { extractCurrencySymbol } from '../../utils/extractionCurrency'

const ConverterForm = ({ rates, convert, baseCurrency }) => {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState(baseCurrency || 'EUR')
  const [convertedAmount, setConvertedAmount] = useState(null)

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']

  useEffect(() => {
    if (rates && amount && fromCurrency && toCurrency) {
      const result = convert(parseFloat(amount), fromCurrency, toCurrency)
      setConvertedAmount(result ? result.toFixed(2) : null)
    }
  }, [amount, fromCurrency, toCurrency, rates, convert])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Currency Converter</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="flex">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field rounded-r-none"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="border border-gray-300 border-l-0 rounded-r-lg px-3 py-2 bg-gray-50"
            >
              {popularCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              const temp = fromCurrency
              setFromCurrency(toCurrency)
              setToCurrency(temp)
            }}
            className="p-2 text-gray-500 hover:text-gray-700"
            title="Swap currencies"
          >
            ⇅
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Convert to
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="input-field"
          >
            {rates && Object.keys(rates.rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency} - {extractCurrencySymbol(currency)}
              </option>
            ))}
          </select>
        </div>

        {convertedAmount && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Converted Amount</div>
              <div className="text-2xl font-bold text-gray-900">
                {extractCurrencySymbol(toCurrency)} {convertedAmount}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </div>
            </div>
          </div>
        )}

        {rates?.date && (
          <div className="text-xs text-gray-500 text-center">
            Exchange rates as of {rates.date}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConverterForm
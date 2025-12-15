import { extractCurrencySymbol } from '../../utils/extractionCurrency'
import Loader from '../UI/Loader'

const CurrencyInfo = ({ currency, currencyName, loading, error }) => {
  if (loading) {
    return <Loader message="Loading currency info..." />
  }

  if (error || !currency || currency === 'N/A') {
    return (
      <div className="text-center py-4 text-gray-600">
        Currency information unavailable
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">Local Currency</div>
          <div className="text-2xl font-bold text-gray-900">
            {extractCurrencySymbol(currency)} ({currency})
          </div>
        </div>
        <div className="text-3xl">💱</div>
      </div>
      
      {currencyName && currencyName !== 'N/A' && (
        <div className="text-gray-600">
          <span className="font-medium">Currency Name:</span> {currencyName}
        </div>
      )}
      
      <div className="text-sm text-gray-500">
        Exchange rates update daily. Use the calculator below for conversions.
      </div>
    </div>
  )
}

export default CurrencyInfo
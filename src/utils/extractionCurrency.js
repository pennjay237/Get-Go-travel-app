export const extractCurrencySymbol = (currencyCode) => {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    CNY: '¥',
    KRW: '₩',
    RUB: '₽',
  }
  
  return symbols[currencyCode] || currencyCode
}
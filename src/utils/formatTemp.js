export const formatTemperature = (temp, unit = 'C') => {
  if (unit === 'F') {
    return `${Math.round((temp * 9/5) + 32)}°F`
  }
  return `${Math.round(temp)}°C`
}

export const getTempUnit = (countryCode) => {
  return countryCode === 'US' ? 'F' : 'C'
}
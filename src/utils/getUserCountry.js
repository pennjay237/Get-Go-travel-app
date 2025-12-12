export const getUserCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code
  } catch (error) {
    console.error('Error getting user country:', error)
    return 'US'
  }
}
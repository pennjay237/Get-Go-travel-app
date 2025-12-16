import axios from "axios";

export const getCountryInfo = async (countryCode) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);

    const country = response.data[0];
    return {
      currency: country.currencies ? Object.keys(country.currencies)[0] : null,
      languages: country.languages ? Object.values(country.languages) : [],
    };
  } catch (error) {
    console.error("Country API error:", error);
    return { currency: null, languages: [] };
  }
};

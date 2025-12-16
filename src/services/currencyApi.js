import axios from "axios";

export const getCurrencyInfo = async (currencyCode) => {
  if (!currencyCode) return null;

  try {
    const response = await axios.get(`https://api.exchangerate.host/latest?base=${currencyCode}`);
    return {
      base: currencyCode,
      rates: response.data.rates,
    };
  } catch (error) {
    console.error("Currency API error:", error);
    return null;
  }
};

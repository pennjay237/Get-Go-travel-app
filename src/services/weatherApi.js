import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export const getWeatherByCity = async (cityName) => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: cityName,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    const data = response.data;

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    console.error("Weather API error:", error);
    return null;
  }
};

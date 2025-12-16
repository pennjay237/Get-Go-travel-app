import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function getHeroImage(city) {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        city
      )}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape`
    );

    return {
      url: response.data.urls.regular,
      photographer: response.data.user.name,
      link: response.data.links.html,
    };
  } catch (error) {
    console.error("Unsplash API error:", error);
    return {
      url: "/hero/default.jpg", 
      photographer: "Default",
      link: "#",
    };
  }
}

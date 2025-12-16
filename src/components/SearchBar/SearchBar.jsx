import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import WeatherCard from "../Weather/WeatherCard";
import AttractionsList from "../Attractions/AttractionList";
import CurrencyInfo from "../Currency/CurrencyInfo";
import LanguageInfo from "../Languages/LanguageInfo";
import AirportInfo from "../Airport/AirportInfo";

import { getWeatherByCity } from "../../services/weatherApi";
import { getAttractionsByCity } from "../../services/attractionApi";
import { getCountryInfo } from "../../services/countryApi";
import { getNearestAirport } from "../../services/airportApi";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [weather, setWeather] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dropdownRef = useRef();

  const fetchSuggestions = async (input) => {
    if (!input) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=${GEOAPIFY_API_KEY}&limit=5`
      );
      const data = await res.json();
      setSuggestions(data.features || []);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const fetchAllData = async (place) => {
    if (!place) return;
    setLoading(true);
    setError(null);

    try {
      const cityName = place.properties.formatted;
      const countryCode = place.properties.country;
      const lat = place.properties.lat;
      const lon = place.properties.lon;

      const [w, a, c, airportData] = await Promise.all([
        getWeatherByCity(cityName),
        getAttractionsByCity(cityName),
        getCountryInfo(countryCode),
        getNearestAirport(lat, lon),
      ]);

      setWeather(w);
      setAttractions(a);
      setCurrency(c.currency);
      setLanguages(c.languages);
      setAirport(airportData);
    } catch (err) {
      console.error(err);
      setError("Failed to load data for this destination.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place) => {
    setSelectedPlace(place);
    setQuery(place.properties.formatted);
    setShowDropdown(false);
    fetchAllData(place);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a place..."
        className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((place) => (
            <li
              key={place.properties.place_id}
              onClick={() => handleSelect(place)}
              className="p-3 cursor-pointer hover:bg-blue-100"
            >
              {place.properties.formatted}
            </li>
          ))}
        </ul>
      )}

      {selectedPlace && (
        <>
          <div className="mt-5 h-64 w-full rounded-lg overflow-hidden shadow-md">
            <MapContainer
              center={[selectedPlace.properties.lat, selectedPlace.properties.lon]}
              zoom={14}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`}
              />
              <Marker position={[selectedPlace.properties.lat, selectedPlace.properties.lon]}>
                <Popup>{selectedPlace.properties.formatted}</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="mt-6 space-y-6">
            <WeatherCard
              weather={weather}
              loading={loading}
              error={error}
              countryCode={selectedPlace.properties.country}
            />
            <AttractionsList attractions={attractions} />
            <CurrencyInfo currency={currency} />
            <LanguageInfo languages={languages} />
            <AirportInfo airport={airport} />
          </div>
        </>
      )}
    </div>
  );
}

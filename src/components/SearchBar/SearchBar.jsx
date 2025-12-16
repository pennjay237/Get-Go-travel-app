import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export default function SearchBar({ onSelectDestination }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const fetchSuggestions = async (input) => {
    if (!input) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          input
        )}&limit=5&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await res.json();
      setSuggestions(data.features || []);
      setShowDropdown(true);
    } catch (err) {
      console.error("Geoapify error:", err);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSelect = (place) => {
    const destination = {
      name: place.properties.formatted,
      lat: place.properties.lat,
      lon: place.properties.lon,
      country: place.properties.country,
    };
    setSelectedPlace(place);
    setQuery(place.properties.formatted);
    setShowDropdown(false);
    onSelectDestination(destination);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
            <Marker
              position={[
                selectedPlace.properties.lat,
                selectedPlace.properties.lon,
              ]}
            >
              <Popup>{selectedPlace.properties.formatted}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

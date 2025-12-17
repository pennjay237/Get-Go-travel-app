import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function Map({ lat, lon, places = [] }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (lat == null || lon == null || mapInstance.current) return;

    mapInstance.current = L.map("map").setView([lat, lon], 12);

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`,
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(mapInstance.current);

    const mainMarker = L.marker([lat, lon])
      .addTo(mapInstance.current)
      .bindPopup("<b>📍 Selected Location</b>");
    markersRef.current.push(mainMarker);

    places.forEach((place) => {
      const { lat: pLat, lon: pLon, name } = place.properties || {};
      if (pLat != null && pLon != null) {
        const marker = L.marker([pLat, pLon])
          .addTo(mapInstance.current)
          .bindPopup(`<b>${name || "Unnamed place"}</b>`);
        markersRef.current.push(marker);
      }
    });

    if (places.length > 0) {
      const bounds = L.latLngBounds([[lat, lon]]);
      places.forEach((place) => {
        const { lat: pLat, lon: pLon } = place.properties || {};
        if (pLat != null && pLon != null) {
          bounds.extend([pLat, pLon]);
        }
      });
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      if (mapInstance.current) {
        markersRef.current.forEach(marker => {
          if (marker && mapInstance.current.hasLayer(marker)) {
            mapInstance.current.removeLayer(marker);
          }
        });
        markersRef.current = [];
        
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lon]);

  useEffect(() => {
    if (!mapInstance.current || lat == null || lon == null) return;

    markersRef.current.forEach((marker, index) => {
      if (index > 0 && marker && mapInstance.current.hasLayer(marker)) {
        mapInstance.current.removeLayer(marker);
      }
    });
    
    if (markersRef.current.length > 0) {
      markersRef.current = [markersRef.current[0]];
    }

    places.forEach((place) => {
      const { lat: pLat, lon: pLon, name } = place.properties || {};
      if (pLat != null && pLon != null) {
        const marker = L.marker([pLat, pLon])
          .addTo(mapInstance.current)
          .bindPopup(`<b>${name || "Unnamed place"}</b>`);
        markersRef.current.push(marker);
      }
    });

    if (places.length > 0) {
      const bounds = L.latLngBounds([[lat, lon]]);
      places.forEach((place) => {
        const { lat: pLat, lon: pLon } = place.properties || {};
        if (pLat != null && pLon != null) {
          bounds.extend([pLat, pLon]);
        }
      });
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [places]);

  if (lat == null || lon == null) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow h-[400px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Map unavailable - no location selected</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Location Map</h3>
      </div>
      <div
        id="map"
        style={{ width: "100%", height: "400px" }}
      ></div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex justify-between">
          <span>Lat: {lat.toFixed(4)}</span>
          <span>Lon: {lon.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}
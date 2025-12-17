import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export default function Map({ lat, lon, places = [] }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersLayer = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!lat || !lon || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([lat, lon], 12);

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_KEY}`,
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }
    ).addTo(mapInstance.current);

    markersLayer.current = L.layerGroup().addTo(mapInstance.current);

    setReady(true);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [lat, lon]);

  /* ---------- Update markers ---------- */
  useEffect(() => {
    if (!ready || !markersLayer.current) return;

    markersLayer.current.clearLayers();

    // Main destination marker
    L.marker([lat, lon])
      .addTo(markersLayer.current)
      .bindPopup("📍 Selected location");

    // POI markers
    places.forEach((place) => {
      const { lat: pLat, lon: pLon, name } = place.properties || {};
      if (!pLat || !pLon) return;

      L.marker([pLat, pLon])
        .addTo(markersLayer.current)
        .bindPopup(name || "Attraction");
    });
  }, [ready, lat, lon, places]);

  /* ---------- Loading Skeleton ---------- */
  if (!lat || !lon) {
    return (
      <div className="bg-slate-100 rounded-2xl h-[420px] flex items-center justify-center text-slate-500">
        Map unavailable
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {!ready && (
        <div className="h-[420px] bg-slate-100 animate-pulse flex items-center justify-center">
          <span className="text-slate-400">Loading map…</span>
        </div>
      )}

      <div
        ref={mapRef}
        className={`h-[420px] w-full transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

yes delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/icons/marker-icon-2x.png",
  iconUrl: "/icons/marker-icon.png",
  shadowUrl: "/icons/marker-shadow.png",
});

export default function MapView({ destination, attractions }) {
  const center = [destination.lat, destination.lon];

  return (
    <MapContainer center={center} zoom={12} className="h-96 w-full rounded shadow">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>{destination.formatted}</Popup>
      </Marker>
      {attractions?.map((poi) => (
        <Marker key={poi.id} position={[poi.lat, poi.lon]}>
          <Popup>{poi.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

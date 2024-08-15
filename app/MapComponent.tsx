"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

const markers = [
  { position: [28.6139, 77.209] as LatLngExpression, label: "New Delhi" },
  { position: [19.076, 72.8777] as LatLngExpression, label: "Mumbai" },
  { position: [13.0827, 80.2707] as LatLngExpression, label: "Chennai" },
  { position: [22.5726, 88.3639] as LatLngExpression, label: "Kolkata" },
  { position: [12.9716, 77.5946] as LatLngExpression, label: "Bangalore" },
];

function CenterMapOnClick({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}

const MapComponent = () => {
  const [center, setCenter] = useState<LatLngExpression>(markers[0].position);

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) => (
        <Marker
          key={marker.label}
          position={marker.position}
          eventHandlers={{
            click: () => setCenter(marker.position),
          }}
        >
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
      <CenterMapOnClick position={center} />
    </MapContainer>
  );
};

export default MapComponent;

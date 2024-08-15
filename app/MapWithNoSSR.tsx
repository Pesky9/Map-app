// MapWithNoSSR.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new Icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const markers = [
  { position: [28.6139, 77.209] as LatLngExpression, label: "New Delhi" },
  { position: [19.076, 72.8777] as LatLngExpression, label: "Mumbai" },
  { position: [13.0827, 80.2707] as LatLngExpression, label: "Chennai" },
  { position: [22.5726, 88.3639] as LatLngExpression, label: "Kolkata" },
  { position: [12.9716, 77.5946] as LatLngExpression, label: "Bangalore" },
];

function CenterMapOnClick({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
}

const MapWithNoSSR = () => {
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

export default MapWithNoSSR;

import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapInner({ center, locaties }) {
  const markers = useMemo(
    () => (locaties || []).filter((l) => l?.coordinaat?.lat && l?.coordinaat?.lng),
    [locaties]
  );

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={center.zoom}
      scrollWheelZoom={true}
      className="h-[420px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((loc) => (
        <Marker key={loc._id} position={[loc.coordinaat.lat, loc.coordinaat.lng]}>
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold">{loc.titel || "Locatie"}</p>
              {loc.adres || loc.stad ? (
                <p className="text-sm opacity-80">
                  {loc.adres}{loc.adres && loc.stad ? ", " : ""}{loc.stad}
                </p>
              ) : null}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coordinaat.lat},${loc.coordinaat.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Route
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

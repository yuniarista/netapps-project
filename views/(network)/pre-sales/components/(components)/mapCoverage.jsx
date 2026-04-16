"use client";

import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapCoverage({
  selectedLead,
  radius,
  coveredHomepassesByODP,
  createHomepassIcon,
  L,
  MapController,
  odpData,
}) {
  return (
    <div className="flex-1 pl-4 relative z-0">
      <MapContainer
        center={[-8.711, 115.177]}
        zoom={14}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedLead && (
          <>
            <MapController center={[selectedLead.lat, selectedLead.lng]} />
            <Marker position={[selectedLead.lat, selectedLead.lng]} />
            <Circle
              center={[selectedLead.lat, selectedLead.lng]}
              radius={radius}
              pathOptions={{
                fillColor: "#2563EB",
                fillOpacity: 0.14,
                weight: 1.5,
              }}
            />

            {coveredHomepassesByODP
              .flatMap((odp) => odp.homepasses)
              .map((hp) => (
                <Marker
                  key={hp.id}
                  position={[hp.lat, hp.lng]}
                  icon={createHomepassIcon(L)}
                >
                  <Popup>
                    <div className="text-xs">
                      <p className="font-bold text-green-600">{hp.hpName}</p>
                      <p className="text-slate-500">
                        ODP:{" "}
                        {
                          odpData.find((o) =>
                            o.homepasses.some((h) => h.id === hp.id),
                          )?.name
                        }
                      </p>
                      <p className="mt-1 border-t pt-1">{hp.address}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}

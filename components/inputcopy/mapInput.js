"use client";

import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon marker default Leaflet yang sering tidak muncul di Next.js
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapInput({ setValue, watch, label, helperText }) {
  const lat = watch("latitude") || -8.504257310001929;
  const lng = watch("longitude") || 115.02791047074426;

  // Komponen internal untuk menangani event klik pada peta
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setValue("latitude", e.latlng.lat);
        setValue("longitude", e.latlng.lng);
      },
    });

    return (
      <Marker
        position={[lat, lng]}
        icon={markerIcon}
        draggable={true}
        eventHandlers={useMemo(
          () => ({
            dragend(e) {
              const marker = e.target;
              const position = marker.getLatLng();
              setValue("latitude", position.lat);
              setValue("longitude", position.lng);
            },
          }),
          [],
        )}
      />
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label || ""}
      </label>
      <div className="h-[300px] w-full rounded-md border overflow-hidden z-0">
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <p className="text-xs text-slate-500">
        {helperText || "Adjust the pin to the exact customer location."}
      </p>
    </div>
  );
}

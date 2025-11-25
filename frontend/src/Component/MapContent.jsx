// components/MapContent.jsx
import { useEffect, useRef } from "react";
import {    
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { defaultIcon, highlightIcon } from "./MarkerIcon";

const MapContent = ({ locations, selected, onSelect }) => {
  const markerRefs = useRef([]);

  const MapEffect = () => {
    const map = useMap();

    // AUTO ZOOM KE MARKER SAAT DIPILIH
    useEffect(() => {
      if (selected) {
        map.flyTo([selected.lat, selected.lng], 16, {
          duration: 1.2,
        });
      }
    }, [selected]);

    return null;
  };

  return (
    <MapContainer
      center={[-0.91, 119.87]}
      zoom={13}
      className="w-full h-full"
      scrollWheelZoom={true}
    >
      <MapEffect />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={[loc.lat, loc.lng]}
          icon={selected?.id === loc.id ? highlightIcon : defaultIcon}
          ref={(el) => (markerRefs.current[index] = el)}
          eventHandlers={{
            click: () => {
              onSelect(loc);

              // 🔥 ANIMASI BOUNCE SAAT DIKLIK
              const marker = markerRefs.current[index];
              if (marker) {
                const icon = marker._icon;
                icon.classList.add("marker-bounce");
                setTimeout(() => icon.classList.remove("marker-bounce"), 700);
              }
            },
            mouseover: () => {
              // highlight saat hover
              const marker = markerRefs.current[index];
              marker.setIcon(highlightIcon);
            },
            mouseout: () => {
              // hilangkan highlight jika bukan marker terpilih
              const marker = markerRefs.current[index];
              if (selected?.id !== loc.id) {
                marker.setIcon(defaultIcon);
              }
            },
          }}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapContent;

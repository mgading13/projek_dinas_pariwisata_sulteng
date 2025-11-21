import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Custom Icon Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function PetaDesaWisata() {
  const navigate = useNavigate();

  const desaWisata = [
    {
      id: 1,
      nama: "Luk Panenteng",
      deskripsi:
        "Desa wisata pesisir dengan keindahan laut biru dan pantai pasir putih yang menawan.",
      foto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      lat: -1.2132062986747645,
      lng: 122.97198245098656,
      path: "/luk-panenteng",
    },
  ];

  return (
    <div className="w-full flex justify-center px-4" id="peta">
      {/* HAPUS BACKGROUND — langsung AspectRatio */}
      <AspectRatio
        ratio={1 / 1}
        className="rounded-full overflow-hidden border-4 border-blue-400 shadow-lg max-w-2xl w-full"
      >
        <MapContainer
          center={[-1.2, 120.5]}
          zoom={8}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {desaWisata.map((desa) => (
            <Marker
              key={desa.id}
              position={[desa.lat, desa.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => navigate(desa.path),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="w-[160px] bg-white shadow-md rounded-md overflow-hidden">
                  <img src={desa.foto} className="w-full h-16 object-cover" />
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">{desa.nama}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {desa.deskripsi}
                    </p>
                  </div>
                </div>
              </Tooltip>

              <Popup>
                <div className="text-sm">
                  <img
                    src={desa.foto}
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-semibold">{desa.nama}</h3>
                  <p className="text-gray-600">{desa.deskripsi}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </AspectRatio>
    </div>
  );
}

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Custom Icon untuk Pinpoint
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // bisa ganti dengan asset lokal
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const PetaDesaWisata = () => {
  const navigate = useNavigate();

  const desaWisata = [
    {
      id: 1,
      nama: "Luk Panenteng",
      lat: -0.9,
      lng: 120.0,
      path: "/luk-panenteng",
    },
    { id: 2, nama: "Pulo Dua", lat: -1.1, lng: 121.5, path: "/pulo-dua" },
    { id: 3, nama: "Danau Lindu", lat: -1.4, lng: 119.9, path: "/danau-lindu" },
  ];

  return (
    <div className="bg-white rounded-full" id="peta">
      <div className="max-w-7xl mx-auto rounded-full shadow-lg border-4 border-blue-400">
        <MapContainer
          center={[-1.2, 120.5]}
          zoom={8}
          style={{ height: "500px", width: "500px", borderRadius: "50%" }}
          className="h-[500px] w-full z-10"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />

          {/* Marker Desa Wisata */}
          {desaWisata.map((desa) => (
            <Marker
              key={desa.id}
              position={[desa.lat, desa.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => navigate(desa.path), // klik marker pindah halaman
              }}
            >
              {/* Tooltip muncul saat hover */}
              <Tooltip
                direction="top"
                offset={[0, -10]}
                opacity={1}
                permanent={false}
              >
                {desa.nama}
              </Tooltip>

              {/* Popup jika ingin ditampilkan juga saat di klik */}
              <Popup>
                <div className="font-semibold text-sm">{desa.nama}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default PetaDesaWisata;

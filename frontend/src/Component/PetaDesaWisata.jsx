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
      deskripsi:
        "Desa wisata pesisir dengan keindahan laut biru dan pantai pasir putih yang menawan.",
      foto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
      lat: -1.2132062986747645, 
      lng: 122.97198245098656,
      path: "/luk-panenteng",
    },
    {
      id: 2,
      nama: "Towale",
      deskripsi:
        "Desa dengan sumber air panas alami dan budaya lokal yang masih terjaga.",
      foto: "https://images.unsplash.com/photo-1526481280695-3c720685208b?auto=format&fit=crop&w=600&q=60",
      lat: -0.7086654990663771,
      lng: 119.66668276358718,
      path: "/towale",
    },
    {
      id: 3,
      nama: "Karosondaya",
      deskripsi:
        "Desa pegunungan dengan udara sejuk dan pemandangan sawah yang hijau.",
      foto: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60",
      lat: -1.0440850390158836, 
      lng: 120.5331585095552,
      path: "/karosondaya",
    },
    {
      id: 4,
      nama: "Pulo Dua",
      deskripsi:
        "Pulau eksotis dengan dua tanjung besar dan air laut jernih, cocok untuk snorkeling.",
      foto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
      lat: -0.8160941245805079, 
      lng: 123.45227862776132,
      path: "/pulo-dua",
    },
    {
      id: 5,
      nama: "Bonebaru",
      deskripsi:
        "Desa pesisir yang kaya akan hasil laut dan budaya nelayan tradisional.",
      foto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60",
      lat: -0.95,
      lng: 120.3,
      path: "/bonebaru",
    },
    {
      id: 6,
      nama: "Pokekea",
      deskripsi:
        "Dikenal dengan situs megalitikum kuno yang menjadi warisan budaya dunia.",
      foto: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=60",
      lat: -1.43,
      lng: 120.72,
      path: "/pokekea",
    },
    {
      id: 7,
      nama: "Malangga",
      deskripsi:
        "Desa pegunungan dengan air terjun alami dan potensi ekowisata yang tinggi.",
      foto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60",
      lat: -1.05,
      lng: 120.25,
      path: "/malangga",
    },
    {
      id: 8,
      nama: "Mendaan",
      deskripsi:
        "Desa yang kaya akan budaya tradisional dan kerajinan tangan masyarakat lokal.",
      foto: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=600&q=60",
      lat: -1.2,
      lng: 120.5,
      path: "/mendaan",
    },
    {
      id: 9,
      nama: "Labuan Belanda",
      deskripsi:
        "Pantai eksotis dengan hamparan pasir putih yang luas dan ombak tenang.",
      foto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
      lat: -1.05,
      lng: 120.8,
      path: "/labuan-belanda",
    },
    {
      id: 10,
      nama: "Bente",
      deskripsi:
        "Desa dengan potensi wisata alam dan hutan mangrove yang masih alami.",
      foto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60",
      lat: -0.92,
      lng: 121.0,
      path: "/bente",
    },
    {
      id: 11,
      nama: "Ungkea",
      deskripsi:
        "Desa wisata dengan panorama laut dan tradisi masyarakat pesisir yang khas.",
      foto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60",
      lat: -0.88,
      lng: 120.9,
      path: "/ungkea",
    },
    {
      id: 12,
      nama: "Taman Anggrek",
      deskripsi:
        "Kawasan taman konservasi anggrek endemik Sulawesi yang menjadi ikon wisata edukasi.",
      foto: "https://images.unsplash.com/photo-1504198266285-165a7b0a2b36?auto=format&fit=crop&w=600&q=60",
      lat: -0.85,
      lng: 119.9,
      path: "/taman-anggrek",
    },
    {
      id: 13,
      nama: "Lore Lindu",
      deskripsi:
        "Taman Nasional dengan keanekaragaman hayati tinggi dan situs megalit kuno.",
      foto: "https://images.unsplash.com/photo-1558185348-3b1e3a4d2d3b?auto=format&fit=crop&w=600&q=60",
      lat: -1.4,
      lng: 120.1,
      path: "/lore-lindu",
    },
    {
      id: 14,
      nama: "Geopark Poso",
      deskripsi:
        "Kawasan geowisata dengan formasi batu unik dan danau alami yang menakjubkan.",
      foto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60",
      lat: -1.35,
      lng: 120.7,
      path: "/geopark-poso",
    },
    {
      id: 15,
      nama: "Pulau Togean",
      deskripsi:
        "Gugusan pulau tropis dengan pantai putih, terumbu karang, dan spot diving kelas dunia.",
      foto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=60",
      lat: -0.43,
      lng: 121.9,
      path: "/pulau-togean",
    },
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
                <div
                  className="w-[180px] rounded-lg overflow-hidden shadow-md bg-white text-gray-800"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={desa.foto}
                    alt={desa.nama}
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-bold">{desa.nama}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {desa.deskripsi}
                    </p>
                  </div>
                </div>
              </Tooltip>

              {/* Popup jika ingin ditampilkan juga saat di klik */}
              <Popup>
                <div className="text-sm">
                  <img
                    src={desa.foto}
                    alt={desa.nama}
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-semibold">{desa.nama}</h3>
                  <p className="text-gray-600">{desa.deskripsi}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default PetaDesaWisata;

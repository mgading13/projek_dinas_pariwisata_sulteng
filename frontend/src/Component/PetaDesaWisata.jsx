import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useRef } from "react";
import Towale from "../assets/SiDewi/Towale1.jpg";
import Karosondaya from "../assets/SiDewi/Karosondaya1.jpg";
import LukPanenteng from "../assets/SiDewi/Paisupok.jpg";
import TamanAnggrek from "../assets/SiDewi/TamanAnggrek1.png";
import PuloDua from "../assets/SiDewi/PuloDua3.jpeg";
import Bonebaru from "../assets/SiDewi/Bonebaru1.jpeg";
import Pokekea from "../assets/SiDewi/Pokekea2.jpg";
import Malangga from "../assets/SiDewi/Malangga1.jpg";
import Mendaan from "../assets/SiDewi/Mendaan1.png";
import LabuanBelanda from "../assets/SiDewi/LabuanBelanda1.jpg";
import Bente from "../assets/SiDewi/Bente1.jpg";
import Ungkea from "../assets/SiDewi/Ungkea1.png";
import Geopark from "../assets/WisataUNggulan/GeoparkPoso.jpg";
import LoreLindu from "../assets/WisataUNggulan/LoreLindu.jpg";
import Togean from "../assets/WisataUNggulan/Togean.jpg";

// Custom Icon Leaflet
const desaIcon = L.icon({
  iconUrl: "https://img.icons8.com/color/48/village.png",
  iconSize: [40, 40],
});

const desaIconHover = L.icon({
  iconUrl: "https://img.icons8.com/color/64/village.png",
  iconSize: [50, 50],
});

const unggulanIcon = L.icon({
  iconUrl: "https://img.icons8.com/color/48/star.png",
  iconSize: [40, 40],
});

const unggulanIconHover = L.icon({
  iconUrl: "https://img.icons8.com/color/64/star.png",
  iconSize: [50, 50],
});

function MapController({ onMapReady }) {
  const map = useMap();
  onMapReady(map);
  return null;
}

export default function PetaDesaWisata() {
  const navigate = useNavigate();
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const mapRef = useRef(null);

  function bounceMarker(marker) {
    let up = true;
    let count = 0;

    const interval = setInterval(() => {
      const y = up ? -10 : 0;
      marker._icon.style.transform = `translateY(${y}px)`;

      up = !up;
      count++;

      if (count === 6) {
        marker._icon.style.transform = "translateY(0px)";
        clearInterval(interval);
      }
    }, 120);
  }

  const desaWisata = [
    {
      id: 1,
      nama: "Luk Panenteng",
      deskripsi:
        "Desa wisata pesisir dengan keindahan laut biru dan pantai pasir putih yang menawan.",
      foto: LukPanenteng,
      lat: -1.2132062986747645,
      lng: 122.97198245098656,
      path: "/luk-panenteng",
    },
    {
      id: 2,
      nama: "Towale",
      deskripsi:
        "Desa dengan sumber air panas alami dan budaya lokal yang masih terjaga.",
      foto: Towale,
      lat: -0.7086654990663771,
      lng: 119.66668276358718,
      path: "/towale",
    },
    {
      id: 3,
      nama: "Karosondaya",
      deskripsi:
        "Desa pegunungan dengan udara sejuk dan pemandangan sawah yang hijau.",
      foto: Karosondaya,
      lat: -1.0440850390158836,
      lng: 120.5331585095552,
      path: "/karosondaya",
    },
    {
      id: 4,
      nama: "Pulo Dua",
      deskripsi:
        "Pulau eksotis dengan dua tanjung besar dan air laut jernih, cocok untuk snorkeling.",
      foto: PuloDua,
      lat: -0.8160941245805079,
      lng: 123.45227862776132,
      path: "/pulo-dua",
    },
    {
      id: 5,
      nama: "Bonebaru",
      deskripsi:
        "Desa pesisir yang kaya akan hasil laut dan budaya nelayan tradisional.",
      foto: Bonebaru,
      lat: -0.95,
      lng: 120.3,
      path: "/bonebaru",
    },
    {
      id: 6,
      nama: "Pokekea",
      deskripsi:
        "Dikenal dengan situs megalitikum kuno yang menjadi warisan budaya dunia.",
      foto: Pokekea,
      lat: -1.43,
      lng: 120.72,
      path: "/pokekea",
    },
    {
      id: 7,
      nama: "Malangga",
      deskripsi:
        "Desa pegunungan dengan air terjun alami dan potensi ekowisata yang tinggi.",
      foto: Malangga,
      lat: -1.05,
      lng: 120.25,
      path: "/malangga",
    },
    {
      id: 8,
      nama: "Mendaan",
      deskripsi:
        "Desa yang kaya akan budaya tradisional dan kerajinan tangan masyarakat lokal.",
      foto: Mendaan,
      lat: -1.2,
      lng: 120.5,
      path: "/mendaan",
    },
    {
      id: 9,
      nama: "Labuan Belanda",
      deskripsi:
        "Pantai eksotis dengan hamparan pasir putih yang luas dan ombak tenang.",
      foto: LabuanBelanda,
      lat: -1.05,
      lng: 120.8,
      path: "/labuan-belanda",
    },
    {
      id: 10,
      nama: "Bente",
      deskripsi:
        "Desa dengan potensi wisata alam dan hutan mangrove yang masih alami.",
      foto: Bente,
      lat: -0.92,
      lng: 121.0,
      path: "/bente",
    },
    {
      id: 11,
      nama: "Ungkea",
      deskripsi:
        "Desa wisata dengan panorama laut dan tradisi masyarakat pesisir yang khas.",
      foto: Ungkea,
      lat: -0.88,
      lng: 120.9,
      path: "/ungkea",
    },
    {
      id: 12,
      nama: "Taman Anggrek",
      deskripsi:
        "Kawasan taman konservasi anggrek endemik Sulawesi yang menjadi ikon wisata edukasi.",
      foto: TamanAnggrek,
      lat: -0.85,
      lng: 119.9,
      path: "/taman-anggrek",
    },
  ];

  const wisataUnggulan = [
    {
      id: 1,
      nama: "Lore Lindu",
      deskripsi:
        "Taman Nasional dengan keanekaragaman hayati tinggi dan situs megalit kuno.",
      foto: LoreLindu,
      lat: -1.4,
      lng: 120.1,
      path: "/lore-lindu",
    },
    {
      id: 2,
      nama: "Geopark Poso",
      deskripsi:
        "Kawasan geowisata dengan formasi batu unik dan danau alami yang menakjubkan.",
      foto: Geopark,
      lat: -1.35,
      lng: 120.7,
      path: "/geopark-poso",
    },
    {
      id: 3,
      nama: "Pulau Togean",
      deskripsi:
        "Gugusan pulau tropis dengan pantai putih, terumbu karang, dan spot diving kelas dunia.",
      foto: Togean,
      lat: -0.43,
      lng: 121.9,
      path: "/pulau-togean",
    },
  ];

  return (
    <div className="w-full flex justify-center px-4" id="peta">
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
          {/* Inject map instance */}
          <MapController
            onMapReady={(map) => {
              mapRef.current = map;
            }}
          />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* ============= DESA WISATA ============= */}
          {desaWisata.map((desa, index) => (
            <Marker
              key={desa.id}
              position={[desa.lat, desa.lng]}
              icon={
                hoveredMarker === `desa-${index}` ? desaIconHover : desaIcon
              }
              eventHandlers={{
                click: (e) => {
                  bounceMarker(e.target);
                  mapRef.current.setView([desa.lat, desa.lng], 14, {
                    animate: true,
                  });
                  navigate(desa.path);
                },
                mouseover: () => setHoveredMarker(`desa-${index}`),
                mouseout: () => setHoveredMarker(null),
              }}
            >
              {/* TOOLTIP CUSTOM */}
              <Tooltip
                direction="top"
                offset={[0, -10]}
                className="custom-tooltip"
              >
                <div className="flex flex-col items-center gap-2 p-2 rounded-lg shadow-md text-center">
                  <img
                    src={desa.foto}
                    alt={desa.nama}
                    className="h-40 rounded object-cover"
                  />

                  <h2 className="font-bold text-sm">{desa.nama}</h2>

                  <p className="text-xs text-gray-700 text-center break-words">
                    {desa.deskripsi}
                  </p>
                </div>
              </Tooltip>
            </Marker>
          ))}

          {/* ============= WISATA UNGGULAN ============= */}
          {wisataUnggulan.map((w, index) => (
            <Marker
              key={w.id}
              position={[w.lat, w.lng]}
              icon={
                hoveredMarker === `unggulan-${index}`
                  ? unggulanIconHover
                  : unggulanIcon
              }
              eventHandlers={{
                click: (e) => {
                  bounceMarker(e.target);
                  mapRef.current.setView([w.lat, w.lng], 14, { animate: true });
                  navigate(w.path);
                },
                mouseover: () => setHoveredMarker(`unggulan-${index}`),
                mouseout: () => setHoveredMarker(null),
              }}
            >
              {/* TOOLTIP CUSTOM */}
              <Tooltip
                direction="top"
                offset={[0, -10]}
                className="custom-tooltip"
              >
                <div className="flex flex-col items-center gap-2 p-2 rounded-lg shadow-md text-center">
                  <img
                    src={w.foto}
                    alt={w.nama}
                    className="h-40 rounded object-cover"
                  />

                  <h2 className="font-bold text-sm">{w.nama}</h2>

                  <p className="text-xs text-gray-700 text-center break-words">
                    {w.deskripsi}
                  </p>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </AspectRatio>
    </div>
  );
}

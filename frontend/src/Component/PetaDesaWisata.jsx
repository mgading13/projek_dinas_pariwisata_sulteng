import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DEFAULT_CENTER = [-1.43, 121.4456]; // Sulawesi Tengah
const DEFAULT_ZOOM = 6;

/* =======================
   MARKER STYLE (DIV ICON)
======================= */
const desaIcon = L.divIcon({
  className: "",
  html: `
    <div class="marker-dot"></div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const unggulanIcon = L.divIcon({
  className: "",
  html: `
    <div class="marker-pulse"></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

/* =======================
   AUTO FIT BOUNDS
======================= */
function AutoFitBounds({ data }) {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const bounds = L.latLngBounds(
      data
        .filter((d) => d.latitude && d.longitude)
        .map((d) => [Number(d.latitude), Number(d.longitude)]),
    );

    if (!bounds.isValid()) return;

    const isMobile = window.innerWidth < 640;

    map.fitBounds(bounds, {
      padding: isMobile ? [30, 30] : [80, 80],
      maxZoom: 8,
      animate: true,
    });
  }, [data, map]);

  return null;
}

/* =======================
   MAIN COMPONENT
======================= */
export default function PetaDesaWisata() {
  const [desaWisata, setDesaWisata] = useState([]);
  const [wisataUnggulan, setWisataUnggulan] = useState([]);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/desaWisata/");

        setDesaWisata(res.data.filter((d) => d.jenisDesa === "DESA_WISATA"));
        setWisataUnggulan(
          res.data.filter((d) => d.jenisDesa === "DESA_UNGGULAN"),
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      className="w-full py-20 px-6  items-center mx-auto"
      style={{
        background: "linear-gradient(135deg, #6BB42C, #ffffff)",
      }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          {t("peta_desa_wisata_sulawesi_tengah")}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/80 max-w-xl mx-auto">
          {t("desc_peta_desa_wisata")}
        </p>
      </div>

      <AspectRatio
        ratio={21 / 9}
        className="max-w-6xl w-full mx-auto rounded-3xl overflow-hidden shadow-2xl"
      >
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="w-full h-full animate-mapFade"
          zoomControl={false}
        >
          <AutoFitBounds data={[...desaWisata, ...wisataUnggulan]} />

          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          {/* ===== DESA WISATA ===== */}
          {desaWisata.map((desa) => (
            <Marker
              position={[Number(desa.latitude), Number(desa.longitude)]}
              icon={desaIcon}
              eventHandlers={{
                click: () =>
                  navigate(
                    `/desa/${desa.namaDesa.toLowerCase().replace(/\s+/g, "-")}`,
                  ),
              }}
            >
              <Tooltip direction="top" offset={[0, -12]} opacity={1}>
                <div className="tooltip-card">
                  <img
                    src={`http://localhost:3000${desa.foto}`}
                    alt={desa.namaDesa}
                  />
                  <div className="p-3">
                    <span className="badge">Desa Wisata</span>
                    <h3>{desa.namaDesa}</h3>
                    <p>{desa.deskripsi}</p>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          ))}

          {/* ===== WISATA UNGGULAN ===== */}
          {wisataUnggulan.map((desa) => (
            <Marker
              position={[Number(desa.latitude), Number(desa.longitude)]}
              icon={unggulanIcon}
              eventHandlers={{
                click: () =>
                  navigate(
                    `/desa/${desa.namaDesa.toLowerCase().replace(/\s+/g, "-")}`,
                  ),
              }}
            >
              <Tooltip direction="top" offset={[0, -14]} opacity={1}>
                <div className="tooltip-card">
                  <img
                    src={`http://localhost:3000${desa.foto}`}
                    alt={desa.namaDesa}
                  />
                  <div className="p-3">
                    <span className="badge badge-unggulan">
                      {t("wisata_unggulan")}
                    </span>
                    <h3>{desa.namaDesa}</h3>
                    <p>{desa.deskripsi}</p>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </AspectRatio>
    </section>
  );
}

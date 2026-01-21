import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

/* =======================
   DEFAULT MAP
======================= */
const DEFAULT_CENTER = [-1.43, 121.4456];
const DEFAULT_ZOOM = 6;

/* =======================
   MARKER ICON
======================= */
const desaIcon = L.divIcon({
  className: "",
  html: `<div class="marker-dot"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const unggulanIcon = L.divIcon({
  className: "",
  html: `<div class="marker-pulse"></div>`,
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
   HELPERS
======================= */
const getNamaDesa = (desa, lang) =>
  lang === "en" ? desa.namaDesa_en : desa.namaDesa_id;

const getLokasi = (desa, lang) =>
  lang === "en" ? desa.lokasi_en : desa.lokasi_id;

const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

const createSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

/* =======================
   MAIN COMPONENT
======================= */
export default function PetaDesaWisata() {
  const [desaWisata, setDesaWisata] = useState([]);
  const [wisataUnggulan, setWisataUnggulan] = useState([]);
  const { t, i18n } = useTranslation();
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
      className="w-full py-20 px-6"
      style={{
        background: "linear-gradient(135deg, #6BB42C, #ffffff)",
      }}
    >
      {/* ===== HEADER ===== */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          {t("peta_desa_wisata_sulawesi_tengah")}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/80 max-w-xl mx-auto">
          {t("desc_peta_desa_wisata")}
        </p>
      </div>

      {/* ===== MAP ===== */}
      <AspectRatio
        ratio={21 / 9}
        className="max-w-6xl w-full mx-auto rounded-3xl overflow-hidden shadow-2xl"
      >
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="w-full h-full"
          zoomControl={false}
        >
          <AutoFitBounds data={[...desaWisata, ...wisataUnggulan]} />

          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          {/* ===== DESA WISATA ===== */}
          {desaWisata.map((desa) => (
            <Marker
              key={desa.id}
              position={[Number(desa.latitude), Number(desa.longitude)]}
              icon={desaIcon}
              eventHandlers={{
                click: () => {
                  navigate(
                    `/desa/${createSlug(getNamaDesa(desa, i18n.language))}`,
                  );
                },
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -12]}
                opacity={1}
                interactive
              >
                {/* <Link
                  to={`/desa/${createSlug(getNamaDesa(desa, i18n.language))}`}
                  className="block"
                > */}
                <div className="tooltip-card cursor-pointer">
                  {isVideo(desa.foto) ? (
                    <video
                      src={`http://localhost:3000${desa.foto}`}
                      className="tooltip-media"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={`http://localhost:3000${desa.foto}`}
                      alt={getNamaDesa(desa, i18n.language)}
                      className="tooltip-media"
                    />
                  )}

                  <div className="p-3">
                    <span className="badge">{t("desa_wisata")}</span>
                    <h3>{getNamaDesa(desa, i18n.language)}</h3>
                    <p>{getLokasi(desa, i18n.language)}</p>
                  </div>
                </div>
                {/* </Link> */}
              </Tooltip>
            </Marker>
          ))}

          {/* ===== WISATA UNGGULAN ===== */}
          {wisataUnggulan.map((desa) => (
            <Marker
              key={desa.id}
              position={[Number(desa.latitude), Number(desa.longitude)]}
              icon={unggulanIcon}
              eventHandlers={{
                click: () => {
                  navigate(
                    `/desa/${createSlug(getNamaDesa(desa, i18n.language))}`,
                  );
                },
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -12]}
                opacity={1}
                interactive
              >
                <div className="tooltip-card cursor-pointer">
                  {isVideo(desa.foto) ? (
                    <video
                      src={`http://localhost:3000${desa.foto}`}
                      className="tooltip-media"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={`http://localhost:3000${desa.foto}`}
                      alt={getNamaDesa(desa, i18n.language)}
                      className="tooltip-media"
                    />
                  )}

                  <div className="p-3">
                    <span className="badge badge-unggulan">
                      {t("wisata_unggulan")}
                    </span>
                    <h3>{getNamaDesa(desa, i18n.language)}</h3>
                    <p>{getLokasi(desa, i18n.language)}</p>
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

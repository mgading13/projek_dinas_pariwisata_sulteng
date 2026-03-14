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
import { useTranslation } from "react-i18next";
import API_URL from "@/lib/api";

const DEFAULT_CENTER = [-1.43, 121.4456];
const DEFAULT_ZOOM = 6;

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

export default function PetaDesaWisata() {
  const [desaWisata, setDesaWisata] = useState([]);
  const [wisataUnggulan, setWisataUnggulan] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API_URL.get("/desaWisata");

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

  const convertYoutubeLink = (url) => {
    if (!url) return null;

    try {
      const urlObj = new URL(url);

      let videoId = null;

      if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.replace("/", "");
      }

      if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v");
      }

      if (!videoId) return null;

      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
    } catch {
      return null;
    }
  };

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-[#2D3C59]  to-[#94A378]">
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
                    `/desa-wisata/${createSlug(getNamaDesa(desa, i18n.language))}`,
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
                  {/* PRIORITAS 1 : FOTO / VIDEO dari field foto */}
                  {desa.foto ? (
                    isVideo(desa.foto) ? (
                      <video
                        src={`${import.meta.env.VITE_BASE_URL}${desa.foto}`}
                        className="tooltip-media"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${desa.foto}`}
                        alt={getNamaDesa(desa, i18n.language)}
                        className="tooltip-media"
                      />
                    )
                  ) : /* PRIORITAS 2 : VIDEO YOUTUBE dari link_video */
                  desa.link_video ? (
                    <iframe
                      src={convertYoutubeLink(desa.link_video)}
                      className="tooltip-media"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    /* PRIORITAS 3 : FALLBACK */
                    <img
                      src="/fallback.jpg"
                      className="tooltip-media"
                      alt="fallback"
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
                  {/* PRIORITAS 1 : FOTO / VIDEO dari field foto */}
                  {desa.foto ? (
                    isVideo(desa.foto) ? (
                      <video
                        src={`${import.meta.env.VITE_BASE_URL}${desa.foto}`}
                        className="tooltip-media"
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${desa.foto}`}
                        alt={getNamaDesa(desa, i18n.language)}
                        className="tooltip-media"
                      />
                    )
                  ) : /* PRIORITAS 2 : VIDEO YOUTUBE dari link_video */
                  desa.link_video ? (
                    <iframe
                      src={convertYoutubeLink(desa.link_video)}
                      className="tooltip-media"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    /* PRIORITAS 3 : FALLBACK */
                    <img
                      src="/fallback.jpg"
                      className="tooltip-media"
                      alt="fallback"
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

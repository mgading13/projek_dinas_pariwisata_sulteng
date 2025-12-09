import { useEffect, useState } from "react";
import NavBar from "./NavBar.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DetailDesa = () => {
  const { slug } = useParams();
  const [desa, setDesa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDesa = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/desaWisata/");
        const data = res.data;

        const found = data.find(
          (d) => d.namaDesa.toLowerCase().replace(/\s+/g, "-") === slug
        );

        setDesa(found || null);
        setLoading(false);
      } catch (error) {
        console.error("Error loading detail desa:", error);
        setLoading(false);
      }
    };

    getDesa();
  }, [slug]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (!desa) return <p className="p-10 text-center">Desa tidak ditemukan.</p>;

  // FINAL URL FOTO
  const bgImage = `http://localhost:3000${desa.foto}`;

  return (
    <>
      <NavBar />

      {/* HERO SECTION */}
      <div
        className="relative min-h-screen bg-cover bg-center fade-in"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative flex flex-col items-center justify-center min-h-screen text-center fade-up">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-4xl font-extrabold text-white mt-2">
            {desa.namaDesa}
          </h1>
          <p className="mt-4 text-white text-xl font-semibold">{desa.lokasi}</p>
        </div>
      </div>

      {/* SECTION 2 — FOTO + DESKRIPSI + TRANSPORT */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center text-white fade-in"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full h-full p-20 fade-up">
          {/* DESKRIPSI */}
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify font-medium">
              {desa.deskripsi}
            </p>
          </div>

          {/* TRANSPORTASI */}
          <div className="md:w-1/4 flex flex-col justify-center mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white fade-up">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider">
                  Lewat Darat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{desa.jalur_darat}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/0 border-0 border-b-2 border-white text-white fade-up">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider">
                  Lewat Laut
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{desa.jalur_laut}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/0 border-0 border-b-2 border-white text-white fade-up">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider">
                  Lewat Udara
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{desa.jalur_udara}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailDesa;

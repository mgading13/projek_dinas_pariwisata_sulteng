import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import Bente1 from "../../assets/SiDewi/Bente1.jpg";
import Bente2 from "../../assets/SiDewi/Bente2.jpeg";
import Bente3 from "../../assets/SiDewi/Bente3.jpeg";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const Bente = () => {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Bente1})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black/40">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-3xl font-bold text-white">Bente</h1>
          <p className="mt-4 text-white">Kabupaten Morowali Utara</p>
        </div>
      </div>

      {/* Deskripsi + Transportasi */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Bente2})` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full h-full p-20">
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed">
              Desa Bente memiliki pesona alam yang masih alami dengan panorama
              pegunungan dan hutan tropis. Udara segar dan suasana pedesaan yang
              tenang menjadi daya tarik utama, cocok bagi wisatawan yang ingin
              melepas penat sekaligus merasakan keramahan masyarakat lokal.
            </p>
          </div>

          {/* Transportasi */}
          <div className="md:w-1/4 flex flex-col mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Darat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">90 km dari Kolonodale</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Laut</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Akses melalui pelabuhan terdekat</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Udara</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Bandara Morowali → jalur darat</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Rekomendasi Paket Wisata */}
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Bente3})` }}
      >
        <div className="p-20 bg-black/40 min-h-screen">
          <div className="text-white font-semibold text-2xl">
            <h1>Rekomendasi Paket Wisata</h1>
            <br />
            <hr />
            <br />
            <DestinasiCarousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bente;

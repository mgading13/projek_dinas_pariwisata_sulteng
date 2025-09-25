import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import Ungkea1 from "../../assets/SiDewi/Ungkea1.png";
import Ungkea2 from "../../assets/SiDewi/Ungkea2.png";
// import Ungkea3 from "../../assets/SiDewi/Ungkea3.jpeg";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const Ungkea = () => {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Ungkea1})` }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen bg-black/40">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-3xl font-bold text-white">Ungkea</h1>
          <p className="mt-4 text-white">Kabupaten Tojo Una-Una</p>
        </div>
      </div>

      {/* Deskripsi + Transportasi */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Ungkea2})` }}
      >
        
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full h-full p-20">
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed">
              Desa Ungkea terkenal dengan kekayaan alam lautnya. Pantai-pantai
              dengan pasir putih dan air laut yang jernih membuatnya cocok untuk
              snorkeling, diving, atau sekadar menikmati suasana tropis yang
              menenangkan.
            </p>
          </div>

          {/* Transportasi */}
          <div className="md:w-1/4 flex flex-col mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Darat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">70 km dari Ampana</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Laut</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Akses dengan kapal lokal</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Udara</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Bandara Ampana → jalur darat</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Rekomendasi Paket Wisata */}
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Ungkea1})` }}
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

export default Ungkea;

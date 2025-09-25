import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import PuloDua1 from "../../assets/SiDewi/PuloDua1.jpeg";
import PuloDua2 from "../../assets/SiDewi/PuloDua2.jpeg";
import PuloDua3 from "../../assets/SiDewi/PuloDua3.jpeg";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const PuloDua = () => {
  return (
    <>
      <NavBar></NavBar>

      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${PuloDua1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-3xl font-bold text-white">Pulo Dua</h1>
          <p className="mt-4 text-white">Kabupaten Banggai Kepulauan</p>
        </div>
      </div>
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${PuloDua2})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Konten */}
        <div className="relative z-10 w-full h-full p-20">
          {/* Deskripsi */}
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed">
              Kepulauan Togean di Teluk Tomini, Sulawesi Tengah, adalah surga
              bahari dengan pantai pasir putih, hutan hujan, dan keindahan bawah
              laut yang memukau. Di sini, wisatawan dapat menyelam, snorkeling,
              berenang bersama ubur-ubur tak menyengat, menjelajah desa
              masyarakat Bajo, hingga menikmati ketenangan di jembatan kayu
              antar pulau. Menjadikannya destinasi yang menyatukan petualangan,
              alam, dan budaya dalam satu pengalaman yang tak terlupakan.
            </p>
          </div>

          {/* Transportasi pakai Card */}
          <div className="md:w-1/4 flex flex-col justify-center mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider">
                  Lewat Darat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">100 km dari Palu &#10148; Luwuk</p>
              </CardContent>
            </Card>

            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider">
                  Lewat Laut
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  100 km dari Luwuk &#10148; Luk Panenteng{" "}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider">
                  Lewat Udara
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">100 km dari Palu &#10148; Luwuk</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${PuloDua3})` }}
      >
        <div className="p-20">
          <div className="text-white font-semibold text-2xl">
            <h1>Rekomendasi Paket Wisata</h1>
            <br />
            <hr />
            <br />
            <DestinasiCarousel></DestinasiCarousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default PuloDua;

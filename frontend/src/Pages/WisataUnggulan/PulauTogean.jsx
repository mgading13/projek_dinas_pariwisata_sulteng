import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import Togean from "../../assets/WisataUNggulan/Togean.jpg";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const PulauTogean = () => {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Togean})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative flex flex-col items-center justify-center gap-2 min-h-screen">
          <h1 className="text-3xl font-bold text-white">Wisata Unggulan</h1>
          <h1 className="text-3xl font-bold text-white">Pulau Togean</h1>
          <p className="mt-4 text-white text-2xl font-semibold">Kabupaten Tojo Una-Una</p>
        </div>
      </div>

      {/* Deskripsi + Transportasi */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Togean})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full h-full p-20">
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify font-medium">
              Kepulauan Togean, yang terletak di Teluk Tomini, Sulawesi Tengah,
              adalah destinasi wisata bahari kelas dunia yang sering dijuluki
              "surga tersembunyi" karena keindahan alamnya yang menakjubkan dan
              lokasinya yang relatif belum terjamah. Kawasan ini merupakan Taman
              Nasional yang kaya akan keanekaragaman hayati laut dan lanskap
              pulau-pulau vulkanik yang indah.
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
                <p className="text-gray-300">
                  Akses melalui pelabuhan terdekat
                </p>
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
      {/* <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Togean})` }}
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
      </div> */}
    </>
  );
};

export default PulauTogean;

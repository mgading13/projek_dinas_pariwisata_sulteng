import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import Pokekea1 from "../../assets/SiDewi/Pokekea.jpg";
import Pokekea2 from "../../assets/SiDewi/Pokekea 2.jpg";
import Pokekea3 from "../../assets/SiDewi/Pokekea3.webp";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const Pokekea = () => {
  return (
    <>
      <NavBar />
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Pokekea1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-3xl font-bold text-white">Pokekea</h1>
          <p className="mt-4 text-white text-xl font-semibold">Kabupaten Poso</p>
        </div>
      </div>

      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Pokekea2})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full h-full p-20">
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify font-medium">
              Desa Wisata Pokekea memiliki keunggulan yang komplet karena
              menawarkan panorama alam yang menakjubkan dengan keberagaman flora
              dan fauna yang dilindungi, dan dibalut dengan misteri peradapan
              masa lampau yang sampai saat ini belum diketahui asal usulnya.
              Semua terbukti dengan keberadaan situs megalit pokekea dengan
              tebaran megalitikum terbesar di Asia Tenggara. Situs megalit
              pokekea, situs megalit ntowera, situs megalit tundu wanua, situs
              megalit wineki, situs megalit hadoa, dan situs wanua rano menjadi
              rekomendasi unggulan di desa wisata pokekea karena menyimpan
              misteri peradaban masa lampau yang mempesona.
            </p>
          </div>

          <div className="md:w-1/4 flex flex-col justify-center mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Darat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Palu ➜ Poso ➜ Pokekea</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Laut</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Pelabuhan Poso ➜ Pokekea</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Udara</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Bandara Kasiguncu ➜ Pokekea</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Pokekea3})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative p-20 text-white font-semibold text-2xl">
          <h1>Rekomendasi Paket Wisata</h1>
          <br /><hr /><br />
          <DestinasiCarousel />
        </div>
      </div> */}
    </>
  );
};

export default Pokekea;

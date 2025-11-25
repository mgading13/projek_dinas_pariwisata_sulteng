import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import Malangga1 from "../../assets/SiDewi/Malangga1.jpg";
import Malangga2 from "../../assets/SiDewi/Malangga2.jpg";
import Malangga3 from "../../assets/SiDewi/Malangga3.jpeg";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const Malangga = () => {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Malangga1})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black/40">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-3xl font-bold text-white">Malangga</h1>
          <p className="mt-4 text-white text-xl font-semibold">
            Kabupaten Donggala
          </p>
        </div>
      </div>

      {/* Deskripsi + Transportasi */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Malangga2})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full h-full p-20">
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify font-medium">
              Desa Wisata Malangga terletak di Kecamatan Galang sekitar 60 menit
              dari Pusat Kota Tolitoli. Desa ini dapat dijangkau dengan
              kendaraan roda dua atau empat. Desa Malangga dijadikan desa wisata
              karena memilik keunikan tersendiri yaitu atap rumah penduduk di
              desa ini dapat dibuka dan ditutup. Fungsinya adalah untuk
              meletakkan hasil bumi di plavon rumah mereka agar cahaya matahari
              bisa langsung mengeringkan hasil bumi tersebut tanpa harus
              menjemurnya di halaman rumah. Selain itu, disekitar desa ini juga
              terdapat pembuatan gula merah dan minyak kelapa kampung yang
              diolah oleh warga desa secara tradisional. Terdapat juga tradisi
              upacara adat panen dan tradisi sumpit yang masih terjaga dan
              dilaksanakan setiap tahun di desa ini.
            </p>
          </div>

          {/* Transportasi */}
          <div className="md:w-1/4 flex flex-col mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Darat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">60 km dari Palu</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Laut</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Akses perahu lokal via Donggala</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Udara</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Bandara Palu → jalur darat</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Paket Wisata */}
      {/* <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Malangga3})` }}
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

export default Malangga;

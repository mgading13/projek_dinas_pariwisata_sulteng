import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import LabuanBelanda1 from "../../assets/SiDewi/LabuanBelanda1.jpg";
import LabuanBelanda2 from "../../assets/SiDewi/LabuanBelanda2.jpg";
import LabuanBelanda3 from "../../assets/SiDewi/LabuanBelanda3.jpg";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const LabuanBelanda = () => {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${LabuanBelanda1})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black/40">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-3xl font-bold text-white">Labuan Belanda</h1>
          <p className="mt-4 text-white text-xl font-semibold">
            Kabupaten Tojo Una-Una
          </p>
        </div>
      </div>

      {/* Deskripsi + Transportasi */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${LabuanBelanda2})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full h-full p-20">
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify font-medium">
              Desa labuan adalah salah satu Desa di wilayah kecamatan Ratolindo,
              Kab. Tojo Una-Una, sulawesi Tengah dengan jarak tempuh yang cukup
              dekat dari ibukota Kabupaten yaitu sekitar 7 Km dan dapat di akses
              dengan menggunakan kenderaan Roda 4. Desa labuan dengan luas 4,3
              Km2 dengan jumlah penduduk 2.677 jiwa dari multi etnis diantaranya
              adalah suku bajo yang memiliki rumah diatas laut. Selain itu desa
              labuan juga menawarkan tempat menginap berupa Cottage dan Homestay
              bagi pengunjung yang berwisata ke desa labuan. Desa Labuan
              Mempunyai banyak Obyek daya tarik Wisata yang wajib dikunjungi
              oleh wisatawan seperti : Pantai Marina Cottage dapat Menikmati
              Sunset yang indah, Perumahan Kampung Bajo yang berdiri diatas
              laut, Tanjung Lawaka yang mempunyai air laut berwarna Hijau Tosca
              dan Tanjung Api, gas alam yang keluar secara alami dengan menggali
              sekitar 5 - 10 cm maka akan keluar Gas alam dan api.
            </p>
          </div>

          {/* Transportasi */}
          <div className="md:w-1/4 flex flex-col mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Darat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Akses via jalur Banggai Laut</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Laut</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Pelabuhan terdekat → Labuan Belanda
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Udara</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Bandara Luwuk → jalur laut</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Paket Wisata */}
      {/* <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${LabuanBelanda3})` }}
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

export default LabuanBelanda;

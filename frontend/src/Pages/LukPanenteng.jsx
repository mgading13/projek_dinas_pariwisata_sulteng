import React from "react";
import NavBar from "../Component/NavBar.jsx";
import LukPanentengbg from "../assets/SiDewi/LukPanenteng.png";
import LukPanenteng1 from "../assets/SiDewi/LukPanenteng1.png";
import LukPanenteng2 from "../assets/SiDewi/LukPanenteng2.png";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
import DestinasiCarousel from "../Component/CarouselPaketWisata.jsx";

const LukPanenteng = () => {
  return (
    <>
    <NavBar></NavBar>
    
    <div  className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${LukPanentengbg})` }}>
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
            <h1 className="text-3xl font-bold text-white">Luk Panenteng</h1>
            <p className="mt-4 text-white">Kabupaten Banggai Kepulauan</p>
        </div>
    </div>
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${LukPanenteng1})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Konten */}
      <div className="relative z-10 w-full h-full p-20">
        {/* Deskripsi */}
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-lg leading-relaxed">
            Kepulauan Togean di Teluk Tomini, Sulawesi Tengah, adalah surga bahari dengan
            pantai pasir putih, hutan hujan, dan keindahan bawah laut yang memukau.
            Di sini, wisatawan dapat menyelam, snorkeling, berenang bersama ubur-ubur tak
            menyengat, menjelajah desa masyarakat Bajo, hingga menikmati ketenangan di
            jembatan kayu antar pulau. Menjadikannya destinasi yang menyatukan petualangan,
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
                <p className="text-gray-300">100 km dari Luwuk &#10148; Luk Panenteng </p>
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
    <div className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${LukPanenteng2})` }}>
        <div className="p-20">
            <div className="text-white font-semibold text-2xl">
                <h1>Rekomendasi Paket Wisata</h1><br /><hr /><br />
                <DestinasiCarousel></DestinasiCarousel>
            </div>
        </div>
    </div>
    </>
  );
};

export default LukPanenteng;

import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import Karosondaya1 from "../../assets/SiDewi/Karosondaya1.jpg";
import Karosondaya2 from "../../assets/SiDewi/Karosondaya2.jpg";
import Karosondaya3 from "../../assets/SiDewi/Karosondaya3.jpg";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const Karosondaya = () => {
  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Karosondaya1})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-3xl font-bold text-white">Karosondaya</h1>
          <p className="mt-4 text-white">Kabupaten Banggai</p>
        </div>
      </div>

      <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
           style={{ backgroundImage: `url(${Karosondaya2})` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-full h-full p-20">
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed">Deskripsi tentang Desa Wisata Karosondaya...</p>
          </div>

          <div className="md:w-1/4 flex flex-col justify-center mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader><CardTitle className="text-sm uppercase">Lewat Darat</CardTitle></CardHeader>
              <CardContent><p className="text-gray-300">Palu ➜ Luwuk ➜ Karosondaya</p></CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader><CardTitle className="text-sm uppercase">Lewat Laut</CardTitle></CardHeader>
              <CardContent><p className="text-gray-300">Pelabuhan Luwuk ➜ Karosondaya</p></CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader><CardTitle className="text-sm uppercase">Lewat Udara</CardTitle></CardHeader>
              <CardContent><p className="text-gray-300">Bandara Luwuk ➜ Karosondaya</p></CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Karosondaya3})` }}>
        <div className="p-20 text-white font-semibold text-2xl">
          <h1>Rekomendasi Paket Wisata</h1>
          <br /><hr /><br />
          <DestinasiCarousel />
        </div>
      </div>
    </>
  );
};

export default Karosondaya;

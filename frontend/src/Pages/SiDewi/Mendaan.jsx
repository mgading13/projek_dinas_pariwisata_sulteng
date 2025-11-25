import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import Mendaan1 from "../../assets/SiDewi/Mendaan1.png";
import Mendaan2 from "../../assets/SiDewi/Mendaan2.png";
import Mendaan3 from "../../assets/SiDewi/Mendaan3.png";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DestinasiCarousel from "../../Component/CarouselPaketWisata.jsx";

const Mendaan = () => {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div
        className="relativenmin-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Mendaan1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black/40">
          <h1 className="text-3xl font-bold text-white">Desa Wisata</h1>
          <h1 className="text-3xl font-bold text-white">Mendaan</h1>
          <p className="mt-4 text-white text-xl font-semibold">
            Kabupaten Buol
          </p>
        </div>
      </div>

      {/* Deskripsi + Transportasi */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Mendaan2})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full h-full p-20">
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify font-medium">
              Desa Taat Adalah Salah Satu Dari Sebelas Desa Yang Berada Di
              Kecamatan Gadung Yang Terletak Di Kabupaten Buol Provinsi Sulawesi
              Tengah. Wisata Desa Taat Ditetapkan Sebagai Desa Wisata Melalui
              Keputusan Bupati Buol NOMOR. 188.04/120.16/Dispora/2022 Pada
              Tanggal 14 Juni 2022 Sebagai Wisata Alam Mangrove Yang Memiliki
              Luasan Area Mangrove Kurang Lebih 14 Ha. Aktivitas Yang Tersedia
              Dan Dapat Dinikmati Oleh Pengunjung di Wisata Alam Mangrove Desa
              Taat Mulai Dari Panorama Alam ,Pertanian, Memancing Ikan Di Area
              Gazebo, Pertunjukan Alat Music Tradisional Kulintang, Rebana,
              Kegiatan Adat Masyarakat Seperti Pertunjukkan Seni Tari Dalam
              Bahasa Daerah Yangga, Serta Pengunjung Dapat Menikmati Makanan
              Khas Tradisional Berupa Jenis Makan Yabuy, Bagea, ( Dalam Bahasa
              Indonesia Ambal Dan Kue Sagu Yang Di Olah Dari Bahan Lokal Yaitu
              Sagu).
            </p>
          </div>

          {/* Transportasi */}
          <div className="md:w-1/4 flex flex-col mt-10 md:mt-0 md:ml-auto space-y-3">
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Darat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Akses terbatas via jalur lokal</p>
              </CardContent>
            </Card>
            <Card className="bg-white/0 border-0 border-b-2 border-white text-white">
              <CardHeader>
                <CardTitle className="text-sm uppercase">Lewat Laut</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Pelabuhan Banggai Laut → Mendaan
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
        style={{ backgroundImage: `url(${Mendaan3})` }}
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

export default Mendaan;

import React from "react";
import NavBar from "../../Component/NavBar.jsx";
import PuloDua1 from "../../assets/SiDewi/Pulo Dua 3.jpeg";
import PuloDua2 from "../../assets/SiDewi/Pulo Dua 2.jpeg";
import PuloDua3 from "../../assets/SiDewi/Pulo Dua.jpeg";

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
          <p className="mt-4 text-white text-xl font-semibold">
            Kabupaten Banggai
          </p>
        </div>
      </div>
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${PuloDua2})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Konten */}
        <div className="relative z-10 w-full h-full p-20">
          {/* Deskripsi */}
          <div className="md:w-2/3 max-w-2xl text-justify font-medium">
            <p className="text-lg leading-relaxed">
              Desa Wisata Pulo Dua adalah sebuah desa pengembang wisata di
              Kecamatan Balantak, Kabupaten Banggai, Sulawesi Tengah, yang
              menawarkan pesona alam berupa gugusan dua pulau dengan keindahan
              bawah laut yang masih alami dan pantai berpasir putih. Destinasi
              ini dapat diakses melalui darat dari Luwuk selama beberapa jam,
              atau melalui laut dan udara, dengan waktu tempuh 15 menit dari
              desa ke pulau utama menggunakan perahu. Wisata Bahari: Menyelam
              dan snorkeling untuk menikmati terumbu karang dan biota laut yang
              belum terjamah. Pantai Pasir Putih: Menikmati keindahan pantai
              dengan pasir putih yang memukau. Pendakian Bukit: Mendaki bukit di
              Pulau Dua untuk menikmati pemandangan indah desa-desa sekitar dan,
              jika cuaca cerah, bisa melihat daratan lain. Budaya Lokal:
              Berinteraksi dengan masyarakat lokal dan menikmati budaya
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
      {/* <div
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
      </div> */}
    </>
  );
};

export default PuloDua;

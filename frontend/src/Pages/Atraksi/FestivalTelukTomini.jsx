import React from 'react'
import Navbar from "../../Component/NavBar";
import FestivalTelukTominiBg from "../../assets/Event/FestivalTelukTomini.jpeg";

const FestivalTelukTomini = () => {
  return (
    <>
      <Navbar></Navbar>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${FestivalTelukTominiBg})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-white">
            Festival Danau Lindu
          </h1>
          <p className="mt-4 text-white">Kabupaten Sigi</p>
          <CountdownTimer targetDate="2025-12-31T00:00:00" />
        </div>
      </div>
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${FestivalTelukTominiBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Konten */}
        <div className="relative z-10 w-full h-full p-20">
          {/* Deskripsi */}
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify">
              Festival Danau Poso adalah pesta budaya tahunan yang menampilkan keindahan
              seni, musik, tarian tradisional, serta olahraga air di salah satu danau
              terbesar di Indonesia. Dikelilingi panorama menakjubkan, festival ini
              mengajak wisatawan merasakan kehangatan masyarakat Poso sekaligus
              menjelajahi warisan budaya yang masih terjaga. Momen senja di tepian danau,
              diiringi nyanyian dan tarian, menjadikan pengalaman ini sulit dilupakan.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FestivalTelukTomini

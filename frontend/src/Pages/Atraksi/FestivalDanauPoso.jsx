import Navbar from "../../Component/NavBar";
import DanauPoso from "../../assets/Event/FestivalDanauPoso.jpg";
import CountdownTimer from "../../Component/CountDown.jsx";
const FestivalDanauPoso = () => {
  return (
    <>
      <Navbar></Navbar>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${DanauPoso})` }}
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
        style={{ backgroundImage: `url(${DanauPoso})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Konten */}
        <div className="relative z-10 w-full h-full p-20">
          {/* Deskripsi */}
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify">
              Festival Danau Poso, sebuah perayaan budaya dan alam yang
              mempertemukan keindahan danau terbesar di Indonesia. Di tengah
              danau yang biru dan tenang, wisatawan dapat menyaksikan pertunjukan
              seni, musik, tarian tradisional, serta olahraga air yang memukau.
              Festival ini juga menghadirkan suasana sejuk, tenang, dan penuh warna
              dari bunga-bunga eksotis yang bermekaran. Tidak hanya sekadar wisata,
              Festival Danau Poso juga menjadi pusat edukasi dan konservasi, menjadikannya
              destinasi ideal bagi pecinta flora maupun keluarga yang ingin berwisata
              sambil belajar.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FestivalDanauPoso

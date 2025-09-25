import Navbar from "../../Component/NavBar";
import DanauLindu from "../../assets/Event/FestivalDanauLindu.jpg";
import CountdownTimer from "../../Component/CountDown.jsx";

const FestivalDanauLindu = () => {
  return (
    <>
      <Navbar></Navbar>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${DanauLindu})` }}
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
        style={{ backgroundImage: `url(${DanauLindu})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Konten */}
        <div className="relative z-10 w-full h-full p-20">
          {/* Deskripsi */}
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify">
              Festival Danau Lindu adalah perayaan budaya dan alam di tepi Danau
              Lindu, Kabupaten Sigi, Sulawesi Tengah. Festival ini menampilkan
              tarian, musik, kuliner, hingga pasar UMKM lokal, serta kegiatan
              edukasi dan wisata alam yang mengangkat potensi budaya dan
              lingkungan setempat. Lebih dari sekadar hiburan, acara ini menjadi
              ruang kolaborasi masyarakat, seniman, dan pemerintah untuk
              melestarikan tradisi, memperkuat ekonomi lokal, dan mengenalkan
              Danau Lindu ke tingkat nasional hingga internasional.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalDanauLindu;

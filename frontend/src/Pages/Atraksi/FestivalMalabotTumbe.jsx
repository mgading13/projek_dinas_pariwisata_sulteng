import Navbar from "../../Component/NavBar";
import MalabotTumbe1 from "../../assets/Event/FestivalTumbe2.png";
import MalabotTumbe2 from "../../assets/Event/FestivalTumbe3.png";
import CountdownTimer from "../../Component/CountDown.jsx";

const FestivalMalabotTumbe = () => {
  return (
    <>
      <Navbar></Navbar>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${MalabotTumbe1})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-white">
            Festival Malabot Tumbe
          </h1>
          <p className="mt-4 text-white">Kabupaten Banggai Kepulauan</p>
          <CountdownTimer targetDate="2025-12-31T00:00:00" />
        </div>
      </div>
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${MalabotTumbe2})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Konten */}
        <div className="relative z-10 w-full h-full p-20">
          {/* Deskripsi */}
          <div className="md:w-2/3 max-w-2xl">
            <p className="text-lg leading-relaxed text-justify">
              Festival Malabot Tumbe adalah perayaan budaya yang memancarkan
              keindahan dan kesenangan alam Kabupaten Banggai Laut. Dengan latar
              belakang laut biru jernih dan hamparan pasir putih, festival ini
              mengundang kegembiraan masyarakat untuk melestarikan tradisi,
              memperkuat ekonomi lokal, dan mengenalkan Kabupaten Banggai Laut
              ke tingkat nasional hingga internasional. Jadi, festival ini bukan
              hanya sekadar hiburan, tetapi juga atraksi budaya yang memikat dengan
              tarian, musik, dan prosesi penuh warna. Bagi wisatawan, Tumbe menjadi
              kesempatan langka untuk menyelami sejarah, tradisi, dan filosofi hidup
              masyarakat Banggai Laut.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default FestivalMalabotTumbe

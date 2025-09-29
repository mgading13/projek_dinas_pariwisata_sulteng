import NavBar from "../Component/NavBar.jsx";
import Globe from "../assets/globe.png";
import "../index.css";
import CarouselWisataUnggulan from "../Component/CarouselWisataUnggulan.jsx";
import CarouselDesaWisata from "../Component/CarouselDesaWisata.jsx";
import CarouselEvent from "../Component/CarouselEvent.jsx";
import Ulasan from "../Component/Ulasan.jsx";
import PetaDesaWisata from "../Component/PetaDesaWisata.jsx";

const Home = () => {
  return (
    <>
      <NavBar></NavBar>

      <div className="bg-black min-h-screen font-nunito text-bold" id="home">
        <div className="flex items-center justify-around pt-20">
          <div className="flex flex-col gap-5">
            <div className="text-white text-4xl flex flex-col gap-2">
              <h1>Sulawesi Tengah</h1>
              <h1>Menunggu Petualanganmu</h1>
            </div>
            <div className="text-white text-xl/8 w-[400px]">
              <p>
                Dari pantai, danau, hingga budaya temukan surga tersembunyi di
                jantung indonesia
              </p>
            </div>
          </div>
          <div><PetaDesaWisata /></div>
        </div>
      </div>

      <CarouselWisataUnggulan></CarouselWisataUnggulan>
      <CarouselDesaWisata></CarouselDesaWisata>
      <div id="atraksi">
        <CarouselEvent />
      </div>
      <Ulasan></Ulasan>
    </>
  );
};

export default Home;

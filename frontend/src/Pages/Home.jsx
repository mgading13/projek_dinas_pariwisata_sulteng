import NavBar from "../Component/NavBar.jsx";
import Globe from "../assets/globe.png";
import "../index.css";
import CarouselWisataUnggulan from "../Component/CarouselWisataUnggulan.jsx";
import CarouselDesaWisata from "../Component/CarouselDesaWisata.jsx";
import CarouselEvent from "../Component/CarouselEvent.jsx";
import Ulasan from "../Component/Ulasan.jsx";
import PetaDesaWisata from "../Component/PetaDesaWisata.jsx";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <NavBar />

      <section
        id="home"
        className="bg-black min-h-screen font-nunito text-bold flex flex-col justify-center"
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            <div className="text-white text-3xl md:text-5xl font-bold leading-tight space-y-2">
              <h1>Sulawesi Tengah</h1>
              <h1>Menunggu Petualanganmu</h1>
            </div>
            <p className="text-white text-lg md:text-xl max-w-md">
              Dari pantai, danau, hingga budaya — temukan surga tersembunyi di
              jantung Indonesia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <PetaDesaWisata />
          </motion.div>
        </div>
      </section>

      <section>
        <CarouselWisataUnggulan />
      </section>

      <section>
        <CarouselDesaWisata />
      </section>

      <section id="atraksi">
        <CarouselEvent />
      </section>

      <section>
        <Ulasan />
      </section>
    </>
  );
};

export default Home;

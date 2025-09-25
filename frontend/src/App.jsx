import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

// Import semua halaman desa wisata
import LukPanenteng from "../src/Pages/SiDewi/LukPanenteng";
import Towale from "../src/Pages/SiDewi/Towale";
import Karosondaya from "../src/Pages/SiDewi/Karosondaya";
import PuloDua from "../src/Pages/SiDewi/PuloDua";
import Bonebaru from "../src/Pages/SiDewi/Bonebaru";
import Pokekea from "../src/Pages/SiDewi/Pokekea";
import Malangga from "../src/Pages/SiDewi/Malangga";
import Mendaan from "../src/Pages/SiDewi/Mendaan";
import LabuanBelanda from "../src/Pages/SiDewi/LabuanBelanda";
import Bente from "../src/Pages/SiDewi/Bente";
import Ungkea from "../src/Pages/SiDewi/Ungkea";
import TamanAnggrek from "../src/Pages/SiDewi/TamanAnggrek";

function App() {
  return (
    <Routes>
      {/* Halaman utama */}
      <Route path="/" element={<Home />} />

      {/* Halaman detail desa wisata */}
      <Route path="/luk-panenteng" element={<LukPanenteng />} />
      <Route path="/towale" element={<Towale />} />
      <Route path="/karosondaya" element={<Karosondaya />} />
      <Route path="/pulo-dua" element={<PuloDua />} />
      <Route path="/bonebaru" element={<Bonebaru />} />
      <Route path="/pokekea" element={<Pokekea />} />
      <Route path="/malangga" element={<Malangga />} />
      <Route path="/mendaan" element={<Mendaan />} />
      <Route path="/labuan-belanda" element={<LabuanBelanda />} />
      <Route path="/bente" element={<Bente />} />
      <Route path="/ungkea" element={<Ungkea />} />
      <Route path="/taman-anggrek" element={<TamanAnggrek />} />
    </Routes>
  );
}

export default App;

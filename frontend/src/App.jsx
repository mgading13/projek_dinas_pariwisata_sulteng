import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import PaketWisata from "./Pages/PaketWisata";
import DetailDesa from "./Component/DetailDesa";
import DetailEvent from "./Component/DetailEvent";
import Kuliner from "./Pages/Kuliner"

function App() {
  return (
    <Routes>
      {/* Halaman utama */}
      <Route path="/" element={<Home />} />
      <Route path="/desa/:slug" element={<DetailDesa />} />
      {/* Halaman Detail Atraksi */}
      <Route path="/event/:id" element={<DetailEvent />} />
      {/* Halaman Info Paket Wisata */}
      <Route path="/paket-wisata" element={<PaketWisata />} />
      <Route path="/kuliner" element={<Kuliner />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LukPanenteng from "./Pages/LukPanenteng";

function App() {
  return (
    <Routes>
      {/* Halaman utama */}
      <Route path="/" element={<Home />} />

      {/* Halaman detail festival */}
      <Route path="/luk-panenteng" element={<LukPanenteng />} />
    </Routes>
  );
}

export default App;
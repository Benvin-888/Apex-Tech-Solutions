import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import Homepage from "./pages/Homepage";
import Packages from "./pages/Packages";
import Aboutus from "./pages/Aboutus";
import Fallback from "./pages/Fallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

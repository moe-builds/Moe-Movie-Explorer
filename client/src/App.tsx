import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";

import "./App.css";
import { MediaDetail } from "./components/Modals/MediaDetail";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/media/:type/:id" element={<MediaDetail />} />
      </Routes>
    </>
  );
}

export default App;

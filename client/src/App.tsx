import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";

import "./App.css";
import { MediaDetail } from "./components/Modals/MediaDetail";
import { VideoPlayer } from "./components/Modals/VideoPlayer";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/media/:type/:id" element={<MediaDetail />} />
        <Route path="/video/:media_type/:id" element={<VideoPlayer />} />
      </Routes>
    </>
  );
}

export default App;

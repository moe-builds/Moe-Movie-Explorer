import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { DataProvider } from "./contexts/DataProvider.tsx";
import { WatchListProvider } from "./contexts/WatchListProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <WatchListProvider>
          <App />
        </WatchListProvider>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>,
);

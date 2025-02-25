import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import CountryDetail from "./components/CountryDetail.jsx";
import Home from "./components/Home.jsx";
import NotFound from "./components/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/:country" element={<CountryDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/*  this is a dynamic route Using ":" to create as a dynamic route that will match any path that starts with a country name */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

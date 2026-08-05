import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import CursorGlow from "./components/CursorGlow";
import Footer from "./components/Footer";

import Admin from "./pages/Admin";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {location.pathname !== "/admin" && <Footer />}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1A1A1A",
            color: "#F5F1EA",
            border: "1px solid rgba(176,141,87,0.3)",
          },
        }}
      />
    </>
  );
}


export default function App() {
  return (
    <>
      <CursorGlow />
      <ScrollToTop />
      <AnimatedRoutes />
    </>
  );
}
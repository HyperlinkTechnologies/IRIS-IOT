import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./app/components/Landing page/Footer";
import NavBar from "./app/components/Landing page/NavBar";

import HomePage from "./app/pages/LandingPage/HomePage";
import PricingPage from "./app/pages/LandingPage/PricingPage";
import ProductsPage from "./app/pages/LandingPage/ProductsPage";
import Contactpage from "./app/pages/LandingPage/Contactpage";

import DashboardPage from "./app/pages/Dashboard/DashboardPage";

import { UserProvider } from "./context/UserContext";

import { ScrollToTop } from "./app/components/Landing page/ScrollTop";

import { Toaster } from "react-hot-toast";

function AppContent() {
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);

  /* Hide Navbar & Footer in Dashboard */
  const isDashboard = location.pathname.startsWith("/Dashboard");

    useEffect(() => {
    setPageLoading(true);

    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#010c29]">
            {pageLoading && (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#010c29]">
          <div className="w-12 h-12 border-4 border-white/20 border-t-[#ff5700] rounded-full animate-spin" />

          <p className="mt-4 text-white/70">
            Loading IRIS...
          </p>
        </div>
      )}
      <Toaster position="top-right" richColors />

      {/* Navbar */}
      {!isDashboard && <NavBar />}

      <main>
        <ScrollToTop />

        <Routes>
          {/* Website Pages */}
          <Route path="/" element={<HomePage />} />

          <Route path="/pricing" element={<PricingPage />} />

          <Route path="/products" element={<ProductsPage />} />

          <Route path="/contact" element={<Contactpage />} />

          {/* Dashboard */}
          <Route path="/Dashboard" element={<DashboardPage />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
</Router>
  );
}

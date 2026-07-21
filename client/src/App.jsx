import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Footer from "./app/components/Landing page/Footer";
import NavBar from "./app/components/Landing page/NavBar";

import HomePage from "./app/pages/LandingPage/HomePage";
import PricingPage from "./app/pages/LandingPage/PricingPage";
import ProductsPage from "./app/pages/LandingPage/ProductsPage";
import Contactpage from "./app/pages/LandingPage/Contactpage";

import DashboardPage from "./app/pages/Dashboard/DashboardPage";

import { ScrollToTop } from "./app/components/Landing page/ScrollTop";

import { Toaster } from "react-hot-toast";

function AppContent() {
  const location = useLocation();

  /* Hide Navbar & Footer in Dashboard */
  const isDashboard = location.pathname.startsWith("/Dashboard");

  return (
    <div className="min-h-screen bg-[#010c29]">
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
      <AppContent />
    </Router>
  );
}

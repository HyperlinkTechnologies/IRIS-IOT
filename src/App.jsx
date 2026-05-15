import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './app/components/Footer';
import NavBar from './app/components/NavBar';
import HomePage from './app/pages/HomePage';
import PricingPage from './app/pages/PricingPage';
import ProductsPage from './app/pages/ProductsPage';
import Contactpage from './app/pages/Contactpage';
import { ScrollToTop } from './app/components/ScrollTop';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './app/pages/Dashboard/DashboardPage';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#010c29]">
        <Toaster position="top-right" richColors />
      {/* Nav Bar */}
      <NavBar/>
      <main>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/Pricing" element={<PricingPage/>}/>
          <Route path="/Products" element={<ProductsPage/>}/>
          <Route path="/Contact" element={<Contactpage/>}/>

          <Route path="/Dashboard" element={<DashboardPage/>}/>
        </Routes>
      </main>
      {/* Footer Section */}
      <Footer/>

    </div>
    </Router>
    
  );
}
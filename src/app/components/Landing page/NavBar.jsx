import React from 'react'
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { loginUrl,signupUrl } from '../../aws-config';

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="backdrop-blur-sm drop-shadow-2xl bg-[#010c29]/60 border-b border-[rgba(255,136,0,0.23)] h-17 fixed top-0 left-0 right-0 z-50">
        <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-12">
          <div className="text-[#e8f0ff] text-xl sm:text-2xl font-black">
            Iris <span className="text-[#ff5700]">IOT</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="/" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Home</a>
            <a href="/Products" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Products</a>
            <a href="/Pricing" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Pricing</a>
            <a href="/Contact" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Contact</a>
            <button className="border border-[rgba(255,136,0,0.31)] text-[#e8f0ff] px-6 py-2 rounded-lg font-bold text-base hover:bg-[rgba(255,136,0,0.1)] hover:border-[#ff5700] transition-colors cursor-pointer"
            onClick={()=>{window.location.href=loginUrl}}>
               Sign In
             </button>
             <button className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-6 py-2 rounded-lg font-bold text-base shadow-[0px_0px_250px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-95 hover:-translate-y-1 cursor-pointer transition-all duration-200 ease-in-out" onClick={()=>{window.location.href=signupUrl}}>
               Get Started
             </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#e8f0ff] p-2 cursor-pointer hover:text-[#ff5700]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-17 left-0 right-0 bg-[#020f35] border-b border-[rgba(255,136,0,0.23)] shadow-lg ">
            <div className="flex flex-col p-4 space-y-4 items-center">
              <a href="/" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Home</a>
              <a href="/Products" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Products</a>
              <a href="/Pricing" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Pricing</a>
              <a href="/Contact" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Contact</a>
              <button className="border border-[rgba(255,136,0,0.31)] text-[#e8f0ff] px-6 py-2 rounded-lg font-bold text-base hover:bg-[rgba(255,136,0,0.1)] hover:border-[#ff5700] transition-colors cursor-pointer" onClick={()=>{window.location.href=loginUrl}}>
               Sign In
             </button>
             <button className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-6 py-2 rounded-lg font-bold text-base shadow-[0px_0px_250px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-95 hover:-translate-y-1 cursor-pointer transition-all duration-200 ease-in-out"
             onClick={()=>{window.location.href=signupUrl}}>
               Get Started
             </button>
            </div>
          </div>
        )}
      </nav>
  )
}

export default NavBar
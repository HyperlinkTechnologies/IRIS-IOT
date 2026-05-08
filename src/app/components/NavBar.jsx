import React from 'react'

function NavBar() {
  return (
    <nav className="backdrop-blur-sm drop-shadow-2xl bg-[#010c29]/60  border-b border-[rgba(255,136,0,0.23)] h-17 fixed top-0 left-0 right-0 z-50">
        <div className="h-full flex items-center justify-between px-12">
          <div className="text-[#e8f0ff] text-2xl font-black">
            Iris <span className="text-[#ff5700]">IOT</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Home</a>
            <a href="#" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Products</a>
            <a href="#" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Pricing</a>
            <a href="#" className="text-[#e8f0ff] font-bold text-base hover:text-[#ff5700] transition-colors">Contact</a>
            <button className="border border-[rgba(255,136,0,0.31)] text-[#e8f0ff] px-6 py-2 rounded-lg font-bold text-base hover:bg-[rgba(255,136,0,0.1)] hover:border-[#ff5700] transition-colors cursor-pointer">
              Sign In
            </button>
            <button className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-6 py-2 rounded-lg font-bold text-base shadow-[0px_0px_250px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-95 hover:-translate-y-1 cursor-pointer transition-all duration-200 ease-in-out">
              Get Started
            </button>
          </div>
        </div>
      </nav>
  )
}

export default NavBar
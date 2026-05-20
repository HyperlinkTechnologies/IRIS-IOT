import React from 'react'
import imgProduct1 from "../../../assets/iris.png";
import { MonitorCog, ShieldCheck, Wifi, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
  const navigate = useNavigate();

  return (
    <div className='relative min-h-screen'>
        <section className="relative py-8 px-4  pt-35 mb-20">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Pricing Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center px-6 py-2 bg-[rgba(201,141,62,0.27)] text-[#ff5700] rounded-full text-sm font-semibold">
              Our Products
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#e8f0ff] leading-tight px-4 text-center mb-6">
            Industrial IoT,<span className="text-[#ff5700]"> end-to-end</span>.
          </h1>
          
          <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-medium text-center">
            Discover our comprehensive range of IoT devices designed to transform your operations with cutting-edge technology and seamless integration.
          </p> 
        </div>
      </section>
      {/* Product Showcase */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="group relative rounded-2xl bg-card border border-black/40 overflow-visible  transition-all duration-300 shadow-2xl">

              {/* Image Container - Overflowing */}
              <div className="relative -top-20 left-1/2 ">
                <div className=" left-1/2 -translate-x-1/2 flex items-center justify-center z-10 h-80 w-160">
                  <img 
                  src={imgProduct1} 
                  alt="Product 1" 
                  width={800}
                  height={400}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-7 pb-6 space-y-4 mt-0">
                <div>
                  <h3 className="text-4xl mb-2 font-bold">IRIS</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Advanced industrial IoT gateway for seamless connectivity and data management.
                  </p>
                </div>

                {/* Bento Grid Features */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-background/50 border border-primary/20 transition-all">
                    <div className="flex items-center space-x-2 mb-1">
                      <Wifi className="text-primary" size={18} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                      Multi-Connectivity
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-background/50 border border-primary/20 transition-all">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="text-primary" size={18} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                      Industrial Integration (MODBUS)
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-background/50 border border-primary/20 transition-all">
                    <div className="flex items-center space-x-2 mb-1">
                      <MonitorCog className="text-primary" size={18} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                      Continuous Monitoring & Control
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-background/50 border border-primary/20 transition-all">
                    <div className="flex items-center space-x-2 mb-1">
                      <ShieldCheck className="text-primary" size={18} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                     Industrial Grade Security
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-[#ff5700] transition-colors flex items-center justify-center space-x-2 group"
                onClick={()=>{window.location.href="https://www.hyperlinktech.in/iris-iot-gateway"}}>
                  <span>Learn More</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-white px-12 py-10'>
        <div className="bg-gray-100 rounded-xl p-8 shadow-lg text-center border border-gray-300 mb-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#333333] mb-4">
            Ready to bring your devices online?
          </h2>
          <p className="text-slate-500 mb-8 max-w-3xl mx-auto">
            Talk to our team — connect your first device in under a week, and see how IRIS can transform your operations with seamless connectivity and powerful insights.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-6 py-2 rounded-lg font-bold text-base shadow-[0px_0px_20px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-95 hover:-translate-y-1 cursor-pointer transition-all duration-200 ease-in-out h-13 w-60">
            Contact Sales
          </button>
        </div>
      </div>
      </section>
    </div>
    
      
      
      
  )
}

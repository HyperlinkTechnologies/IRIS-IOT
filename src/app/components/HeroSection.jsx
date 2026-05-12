import { ArrowBigDown, ArrowDown } from "lucide-react";
import imgDashboardImage from "../../assets/Dashboard_1.png";
import { signInWithRedirect } from "aws-amplify/auth";

export default function HeroSection() {
  return (
    <div className="bg-[#010c29] min-h-screen pt-20 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6 sm:mb-8 mt-4">
          <div className="bg-[rgba(255,136,0,0.23)] border border-[#ff5700] px-4 sm:px-6 lg:px-8 py-1 rounded-full">
            <span className="text-[rgba(180,200,255,0.73)] text-xs sm:text-sm tracking-wider font-light">
              Industrial IOT Platform
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#e8f0ff] leading-tight px-4">
            Monitor, Analyze & <span className="text-[#ff5700]">Control</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>your Devices in Real-Time
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
          <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-medium">
            Iris IoT Platform transforms your industrial data into powerful, actionable dashboards — built for scale, speed, and reliability.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
          <a 
          className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-6 sm:px-8 py-3 rounded-lg font-bold text-sm sm:text-base shadow-[0px_0px_250px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-95 cursor-pointer hover:-translate-y-1 transition-all duration-200 ease-in-out text-center">
            <button className="text-[#e8f0ff] font-bold text-sm sm:text-base cursor-pointer"
            onClick={()=>signInWithRedirect()}>
            Get Started
          </button>
          </a>
          
          <a href="https://www.hyperlinktech.in/iris-iot-gateway" 
          className="border border-[rgba(255,136,0,0.23)] text-[#e8f0ff] px-6 sm:px-8 py-3 rounded-lg font-bold text-sm sm:text-base hover:bg-[rgba(255,136,0,0.1)] hover:border-[#ff5700] transition-colors cursor-pointer text-center">
          <button className="text-[#e8f0ff] font-bold text-sm sm:text-base cursor-pointer">
            View Products
          </button></a>
          
        </div>

        {/* Dashboard Image */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[rgba(180,200,255,0.73)] shadow-[0px_15px_50px_0px_rgba(180,200,255,0.73)] py-4 px-4">
          <img
            src={imgDashboardImage}
            alt="Dashboard Preview"
            className="w-full h-auto rounded-2xl border-[rgba(170,182,216,0.73)]"
          />
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <div className="border border-[rgba(255,85,0,0.45)] rounded-full w-9 h-13 sm:w-8 sm:h-12 flex items-center justify-center">
            <ArrowDown className="text-[#ff5700] text-xl sm:text-2xl"/>
          </div>
        </div>
      </div>
    </div>
  );
}

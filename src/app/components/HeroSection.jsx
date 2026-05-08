import { ArrowBigDown, ArrowDown } from "lucide-react";
import imgDashboardImage from "../../assets/Dashboard_1.png";

export default function HeroSection() {
  return (
    <div className="bg-[#010c29] min-h-screen pt-30 pb-20 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[rgba(255,136,0,0.23)] border border-[#ff5700] px-8 py-1 rounded-full">
            <span className="text-[rgba(180,200,255,0.73)] text-sm tracking-wider font-light">
              Industrial IOT Platform
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-6xl font-black text-[#e8f0ff] leading-tight">
            Monitor, Analyze & <span className="text-[#ff5700]">Control</span>
            <br />
            your Devices in Real-Time
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8 max-w-5xl mx-auto">
          <p className="text-[rgba(180,200,255,0.73)] text-base font-medium">
            Iris IoT Platform transforms your industrial data into powerful, actionable dashboards — built for scale, speed, and reliability.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <a href="https://us-east-1nd1mqho9q.auth.us-east-1.amazoncognito.com/login?client_id=3l8efe5ajhfo1eh2it4diicjf6&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Firis-widgets.netlify.app%2F">
          <button className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-8 py-3 rounded-lg font-bold text-base shadow-[0px_0px_250px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-95 cursor-pointer hover:-translate-y-1 transition-all duration-200 ease-in-out">
            Get Started
          </button>
          </a>
          
          <button className="border border-[rgba(255,136,0,0.23)] text-[#e8f0ff] px-8 py-3 rounded-lg font-bold text-base hover:bg-[rgba(255,136,0,0.1)] hover:border-[#ff5700] cursor-pointer transition-colors">
            View Demo Dashboard
          </button>
        </div>

        {/* Dashboard Image */}
        <div className="relative rounded-2xl overflow-hidden border border-[rgba(180,200,255,0.73)] shadow-[0px_15px_50px_0px_rgba(180,200,255,0.73)] py-4 px-4">
          <img
            src={imgDashboardImage}
            alt="Dashboard Preview"
            className="w-full h-auto rounded-2xl border-[rgba(170,182,216,0.73)]"
          />
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center mt-12">
          <div className="border border-[rgba(255,85,0,0.53)] rounded-full w-12 h-17 flex items-center justify-center">
            <ArrowDown className="text-[#ff5700]"/>
          </div>
        </div>
      </div>
    </div>
  );
}

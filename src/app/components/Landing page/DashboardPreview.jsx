import imgDashboard1 from "../../../assets/dashboard_2.png";
import imgDashboard2 from "../../../assets/Dashboard_preview_1.png";
import imgDashboard3 from "../../../assets/Dashboard_preview_2.png";
import imgDashboard4 from "../../../assets/Dashboard_preview_3.png";
import { signupUrl } from "../../aws-config";

const dashboards = [
  imgDashboard1,
  imgDashboard2,
  imgDashboard3,
  imgDashboard4
];

export default function DashboardPreviewSection() {
  return (
    <div className="bg-[#e8f0ff] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[#ff5700] text-base sm:text-lg font-bold tracking-widest uppercase">
            Dashboard Preview
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#0a1c50] text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
          Visualize Data Built for Clarity & Control
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-24 sm:w-32 rounded-full mb-6 sm:mb-8" />

        {/* Description */}
        <p className="text-[#010c29] text-sm sm:text-base font-light mb-6 sm:mb-8">
          Customize every widget to match your workflow. Choose from gauges, time-series graphs, heatmaps, device grids, and more — all in a drag-and-drop builder.
        </p>

        {/* CTA Button */}
        <button className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base mb-8 sm:mb-12 hover:opacity-90 transition-opacity cursor-pointer"
        onClick={()=>{window.location.href=signupUrl}}>
          Try the Dashboard
        </button>

        {/* Dashboard Images Carousel */}
        <div className="relative overflow-hidden w-full">

          <div className="flex w-max gap-4 sm:gap-6 animate-marquee">

            {/* Original Set */}
            {dashboards.map((img, index) => (
              <div
                key={index}
                className="shrink-0 rounded-2xl overflow-hidden
                border border-[rgba(180,200,255,0.73)]
                shadow-[0px_0px_30px_0px_rgba(255,136,0,0.23)]"
              >
                <img
                  src={img}
                  alt={`Dashboard ${index + 1}`}
                  className="w-[320px] sm:w-112.5 lg:w-137.5
                  h-auto object-cover"
                />
              </div>
            ))}

            {/* Duplicate Set */}
            {dashboards.map((img, index) => (
              <div
                key={`duplicate-${index}`}
                className="shrink-0 rounded-2xl overflow-hidden
                border border-[rgba(180,200,255,0.73)]
                shadow-[0px_0px_30px_0px_rgba(255,136,0,0.23)]"
              >
                <img
                  src={img}
                  alt={`Dashboard ${index + 1}`}
                  className="w-[320px] sm:w-112.5 lg:w-137.5
                  h-auto object-cover"
                />
              </div>
            ))}

          </div>

        </div> 
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

      `}</style>
    </div>
  );
}

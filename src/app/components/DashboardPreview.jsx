import imgDashboard1 from "../../assets/dashboard_2.png";
import imgDashboard2 from "../../assets/Dashboard_preview_1.png";
import imgDashboard3 from "../../assets/Dashboard_preview_2.png";
import imgDashboard4 from "../../assets/Dashboard_preview_3.png";

const dashboards = [
  imgDashboard1,
  imgDashboard2,
  imgDashboard3,
  imgDashboard4
];

export default function DashboardPreviewSection() {
  return (
    <div className="bg-[#e8f0ff] py-20 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-6">
          <span className="text-[#ff5700] text-lg font-bold tracking-widest uppercase">
            Dashboard Preview
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#0a1c50] text-4xl font-extrabold mb-6 leading-tight">
          Visualize Data Built for Clarity & Control
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-32 rounded-full mb-8" />

        {/* Description */}
        <p className="text-[#010c29] text-base font-light mb-8">
          Customize every widget to match your workflow. Choose from gauges, time-series graphs, heatmaps, device grids, and more — all in a drag-and-drop builder.
        </p>

        {/* CTA Button */}
        <button className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-8 py-3 rounded-lg font-bold text-base mb-12 hover:opacity-90 transition-opacity cursor-pointer">
          Try the Dashboard
        </button>

        {/* Dashboard Images Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {/* First set */}
            {dashboards.map((img, index) => (
              <div
                key={index}
                className="shrink-0 rounded-2xl overflow-hidden border border-[rgba(180,200,255,0.73)] shadow-[0px_0px_30px_0px_rgba(255,136,0,0.23)]"
                style={{ width: 'calc(25% - 18px)', minWidth: '500px' }}
              >
                <img
                  src={img}
                  alt={`Dashboard ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {dashboards.map((img, index) => (
              <div
                key={`dup-${index}`}
                className="shrink-0 rounded-2xl overflow-hidden border border-[rgba(180,200,255,0.73)] shadow-[0px_0px_30px_0px_rgba(255,136,0,0.23)]"
                style={{ width: 'calc(25% - 18px)', minWidth: '500px' }}
              >
                <img
                  src={img}
                  alt={`Dashboard ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

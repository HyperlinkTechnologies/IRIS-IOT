export default function CtaSection() {
  return (
    <div className="bg-[#e8f0ff] py-20 px-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Tag */}
        <div className="mb-6">
          <span className="text-[#ff5700] text-lg font-bold tracking-widest uppercase">
            Get Started Today
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#0a1c50] text-4xl font-extrabold mb-6 leading-tight">
          Ready to bring your devices online?
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-32 rounded-full mb-8 mx-auto" />

        {/* Description */}
        <p className="text-[#010c29] text-base font-light mb-8 max-w-3xl mx-auto">
          Launching IRIS — a smarter way to monitor and control your industrial systems. Start free today.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-8 py-3 rounded-lg font-bold text-base shadow-[0px_0px_250px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-90 transition-opacity">
            Create Account
          </button>
          <button className="border border-[#0a1c50] text-[#0a1c50] px-8 py-3 rounded-lg font-bold text-base hover:bg-[rgba(10,28,80,0.05)] transition-colors">
            Request a Demo
          </button>
        </div>
      </div>
    </div>
  );
}

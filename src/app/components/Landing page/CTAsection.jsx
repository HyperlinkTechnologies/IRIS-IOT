

export default function CtaSection() {
  return (
    <div className="bg-[#e8f0ff] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[#ff5700] text-base sm:text-lg font-bold tracking-widest uppercase">
            Get Started Today
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#0a1c50] text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight px-4">
          Ready to bring your devices online?
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-24 sm:w-32 rounded-full mb-6 sm:mb-8 mx-auto" />

        {/* Description */}
        <p className="text-[#010c29] text-sm sm:text-base font-light mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
          Launching IRIS — a smarter way to monitor and control your industrial systems. Start free today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <button className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base shadow-[0px_0px_250px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-90 transition-opacity cursor-pointer"
          onClick={() => {
            window.location.href =
              "https://us-east-1nd1mqho9q.auth.us-east-1.amazoncognito.com/signup" +
              "?client_id=5d8uo8cktjc6ukhnps699nj68i" +
              "&response_type=code" +
              "&scope=openid+email+profile" +
              "&redirect_uri=https://iris-iot-react.netlify.app/Dashboard";
          }}>
            Create Account
          </button>
          <button className="border border-[#0a1c50] text-[#0a1c50] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base hover:bg-[rgba(10,28,80,0.05)] transition-colors cursor-pointer" 
          onClick={()=>{window.location.href="/Products"}}>
            View Products
          </button>
        </div>
      </div>
    </div>
  );
}

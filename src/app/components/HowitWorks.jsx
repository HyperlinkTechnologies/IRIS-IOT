const steps = [
  {
    number: "01",
    title: "Connect Devices",
    description: "Plug in via the Iris Gateway supporting Modbus, MQTT, and more. Zero-code setup."
  },
  {
    number: "02",
    title: "Send Data Securely",
    description: "Encrypted, reliable data pipelines stream telemetry to the cloud in real time."
  },
  {
    number: "03",
    title: "Visualize on Dashboard",
    description: "Drag-and-drop widgets for your KPIs, trends, and device states — live."
  },
  {
    number: "04",
    title: "Take Action with alerts",
    description: "Smart rules trigger instant notifications so your team can respond before failures occur."
  }
];

export default function HowItWorksSection() {
  return (
    <div className="bg-[#010c29] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[#ff5700] text-base sm:text-lg font-bold tracking-widest uppercase">
            How It Works
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#e8f0ff] text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
          From device to dashboard in four steps
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-24 sm:w-32 rounded-full mb-10 sm:mb-16" />

        {/* Steps Grid */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#020f35] border border-[rgba(255,136,0,0.23)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center"
            >
              {/* Number Badge */}
              <div className="border border-[#d84800] rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 shadow-[0px_0px_30px_0px_rgba(255,136,0,0.23)]">
                <span className="text-[#e8f0ff] text-xl sm:text-2xl font-extrabold">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[#e8f0ff] text-base sm:text-lg font-bold mb-3 sm:mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

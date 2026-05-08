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
    <div className="bg-[#010c29] py-20 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-6">
          <span className="text-[#ff5700] text-lg font-bold tracking-widest uppercase">
            How It Works
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#e8f0ff] text-4xl font-extrabold mb-6 leading-tight">
          From device to dashboard in four steps
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-32 rounded-full mb-16" />

        {/* Steps Grid */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#020f35] border border-[rgba(255,136,0,0.23)] rounded-3xl p-8 flex flex-col items-center text-center"
            >
              {/* Number Badge */}
              <div className="border border-[#d84800] rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-[0px_0px_30px_0px_rgba(255,136,0,0.23)]">
                <span className="text-[#e8f0ff] text-2xl font-extrabold">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[#e8f0ff] text-lg font-bold mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[rgba(180,200,255,0.73)] text-base font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

const integrations = [
  {
    badge: "MODBUS",
    title: "Real-Time Dashboards",
    description: "Native Modbus RTU/TCP support via the Iris edge gateway — plug in PLCs and sensors directly."
  },
  {
    badge: "MQTT",
    title: "Lightweight Messaging",
    description: "Standard MQTT broker support for lightweight, battery-efficient IoT devices at the edge."
  },
  {
    badge: "REST",
    title: "REST APIs",
    description: "Full REST API access for custom integrations, third-party platforms, and enterprise systems."
  }
];

export default function IntegrationsSection() {
  return (
    <div className="bg-[#e8f0ff] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-4 sm:mb-6 text-center">
          <span className="text-[#ff5700] text-base sm:text-lg font-bold tracking-widest uppercase">
            Integrations
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#0a1c50] text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 text-center leading-tight">
          Connects to your existing stack
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-24 sm:w-32 rounded-full mb-10 sm:mb-16 mx-auto" />

        {/* Integration Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-[#071540] border border-[rgba(255,136,0,0.23)] rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center"
            >
              {/* Badge */}
              <div className="bg-[rgba(255,136,0,0.23)] border border-[#ff5700] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 opacity-80">
                <span className="text-[rgba(180,200,255,0.73)] text-xs sm:text-sm tracking-wider font-light">
                  {integration.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[#e8f0ff] text-sm sm:text-base font-bold mb-3 sm:mb-4">
                {integration.title}
              </h3>

              {/* Description */}
              <p className="text-[rgba(180,200,255,0.73)] text-xs sm:text-sm font-light leading-relaxed">
                {integration.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

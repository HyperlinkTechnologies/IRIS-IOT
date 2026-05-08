import { CheckSquare } from "lucide-react";

export default function SaasMultiTenancySection() {
  return (
    <div className="bg-[#010c29] py-20 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
            <div className="mb-6">
              <span className="text-[#ff5700] text-lg font-bold tracking-widest uppercase">
                SaaS & Multi-Tenancy
              </span>
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>

            {/* Heading */}
            <h2 className="text-[#e8f0ff] text-4xl font-extrabold mb-6 leading-tight">
              One Platform. Unlimited Clients.
            </h2>

            {/* Description */}
            <p className="text-[#e8f0ff] text-base font-light leading-relaxed">
              Manage multiple clients, locations, and device fleets from a single installation. Iris scales with your business without complexity.
            </p>
          </div>

          {/* Right Content with Vertical Line and List */}
          <div className="flex gap-6 items-start">
            {/* Vertical Orange Gradient Line */}
            <div className="bg-linear-to-b from-[#d84800] to-[#ff5700] w-1 h-52 rounded-full shrink-0" />

            {/* Checklist */}
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-2">
                <CheckSquare className="text-[#ff5700] text-base mt-1"/>
                <p className="text-[rgba(180,200,255,0.73)] text-base font-light leading-relaxed">
                  Tenant-based access — Each client logs in to their isolated workspace with custom branding and permissions.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="text-[#ff5700] text-base mt-1"/>
                <p className="text-[rgba(180,200,255,0.73)] text-base font-light leading-relaxed">
                  Client-specific dashboards — Tailored views and widgets per tenant, fully configurable by admins.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="text-[#ff5700] text-base mt-1"/>
                <p className="text-[rgba(180,200,255,0.73)] text-base font-light leading-relaxed">
                  Secure data separation — Row-level security ensures zero cross-tenant data exposure, even on shared infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

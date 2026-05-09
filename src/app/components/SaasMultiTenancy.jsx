import { CheckSquare } from "lucide-react";

export default function SaasMultiTenancySection() {
  return (
    <div className="bg-[#010c29] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[#ff5700] text-base sm:text-lg font-bold tracking-widest uppercase">
            SaaS & Multi-Tenancy
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div>

            {/* Heading */}
            <h2 className="text-[#e8f0ff] text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
              One Platform. Unlimited Clients.
            </h2>

            {/* Description */}
            <p className="text-[#e8f0ff] text-sm sm:text-base font-light leading-relaxed">
              Manage multiple clients, locations, and device fleets from a single installation. Iris scales with your business without complexity.
            </p>
          </div>

          {/* Right Content with Vertical Line and List */}
          <div className="flex gap-4 sm:gap-6 items-start mt-6 lg:mt-0">
            {/* Checklist */}
            <div className="space-y-3 sm:space-y-4 flex-1">
              <div className="flex items-start gap-2">
                <CheckSquare className="text-[#ff5700] text-sm sm:text-base mt-1 shrink-0"/>
                <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-light leading-relaxed">
                  Tenant-based access — Each client logs in to their isolated workspace with custom branding and permissions.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="text-[#ff5700] text-sm sm:text-base mt-1 shrink-0"/>
                <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-light leading-relaxed">
                  Client-specific dashboards — Tailored views and widgets per tenant, fully configurable by admins.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare className="text-[#ff5700] text-sm sm:text-base mt-1 shrink-0"/>
                <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-light leading-relaxed">
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

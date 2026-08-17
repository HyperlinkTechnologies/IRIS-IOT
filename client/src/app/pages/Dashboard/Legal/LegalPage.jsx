import { ArrowLeft } from "lucide-react";

export default function LegalPage({
  title,
  sections,
  setActiveTab,
}) {
  return (
    
    <div className="w-full border
      border-black/20 p-4 rounded-xl">
        <div
  onClick={() => setActiveTab("settings")}
  className="
    inline-flex
    items-center
    gap-2
    mb-8
    text-gray-500
    hover:text-[#ff5700]
    transition-colors
    cursor-pointer
    font-medium
  "
>
  <ArrowLeft size={18} />

  Back to Settings
</div>
      <h1 className="text-3xl font-bold text-[#010c29] mb-2">
        {title}
      </h1>

      <p className="text-gray-500 mb-10">
        This document is provided for development purposes
        and will be replaced with the official version
        before production deployment.
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xl font-semibold text-[#010c29] mb-3">
              {section.heading}
            </h2>

            <p className="text-gray-600 leading-7">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
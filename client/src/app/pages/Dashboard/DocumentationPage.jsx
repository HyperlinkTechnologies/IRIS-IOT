import { FileText, Download, BookOpen } from "lucide-react";

import { useState, useEffect } from "react";

import DocumentationCard from "../../components/Documentation/DocumentationCard";
import { documentationSections } from "../../core/documentation/documentaionData";
import DocumentationModal from "../../components/Documentation/DocumentationModal";
import { generateDocumentationPdf } from "../../../utils/generateDocumentationPdf";

export default function DocumentationPage() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleDownloadManual = () => {
  generateDocumentationPdf();
};

  return (
    <div className="w-full border
      border-black/20 p-4 rounded-xl">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl font-bold text-[#010c29]">
  Documentation
</h1>

<p className="mt-1 text-gray-500">
  Learn how to configure, use, and manage the IRIS IoT Platform.
</p>
      </div>

      {/* ================= MAIN DOCUMENTATION CARD ================= */}

      <div className="mb-8">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-orange-200 bg-linear-to-r from-orange-50 to-white p-6">
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
    Welcome to the IRIS IoT Platform Documentation
  </h2>

      <p className="mt-2 max-w-3xl text-gray-600">
         This documentation provides everything you need to deploy, configure,
    and operate the IRIS IoT Platform. Browse the guides below to learn
    about device setup, dashboards, analytics, alerts, MQTT communication,
    firmware development, and platform administration.
      </p>
    </div>

    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleDownloadManual}
        className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 cursor-pointer"
      >
        <Download size={18} />
        Download User Manual
      </button>
    </div>
  </div>
</div>


      {/* ================= DOCUMENTATION LIBRARY ================= */}

      <div className="mt-10">


        <div
          className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
    "
        >
          {documentationSections.map((section) => (
            <DocumentationCard
              key={section.id}
              section={section}
              onClick={() => setSelectedDoc(section.id)}
            />
          ))}
        </div>
      </div>

      <DocumentationModal
        docId={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}

/* ================= DOC CARD ================= */

function DocCard({ title, icon }) {
  return (
    <div
      className="
        bg-black/5

        border
        border-black/10

        shadow-md

        rounded-3xl

        p-5
        sm:p-6

        hover:border-[#ff5700]/30
        hover:shadow-lg
        hover:-translate-y-1

        transition-all
        duration-300

        cursor-pointer
      "
    >
      {/* Icon */}
      <div
        className="
          w-12
          h-12

          rounded-xl

          bg-orange-500/10

          flex
          items-center
          justify-center

          text-[#ff5700]

          mb-5

          border
          border-orange-500/10
        "
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="
          text-lg
          sm:text-xl

          font-bold

          text-[#010c29]
        "
      >
        {title}
      </h3>
    </div>
  );
}

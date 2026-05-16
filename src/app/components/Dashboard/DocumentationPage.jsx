import {
  FileText,
  Download,
  BookOpen
} from "lucide-react";

export default function DocumentationPage() {

  return (

    <div>

      {/* Header */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Documentation
        </h2>

        <p className="text-gray-400 mt-1">
          Access setup guides and technical resources
        </p>

      </div>

      {/* Documentation Card */}
      <div className="
        bg-[#071633]
        border
        border-white/10
        rounded-3xl
        p-10
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-8
        ">

          <div className="
            flex
            items-start
            gap-5
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-orange-500/10
              flex
              items-center
              justify-center
              text-[#ff5700]
            ">

              <BookOpen size={28} />

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-2">
                IRIS Documentation
              </h3>

              <p className="text-gray-400 max-w-xl">
                Download the complete technical documentation,
                installation guide, API reference and setup manual
                for the IRIS Industrial IoT Platform.
              </p>

            </div>

          </div>

          <button
            className="
              flex
              items-center
              justify-center
              gap-3
              px-8
              py-4
              rounded-2xl
              bg-linear-to-r
              from-[#d84800]
              to-[#ff5700]
              hover:opacity-90
              transition-all
              font-medium
            "
          >

            <Download size={20} />

            Download PDF

          </button>

        </div>

      </div>

      {/* Additional Docs */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mt-8
      ">

        <DocCard
          title="API Reference"
          icon={<FileText />}
        />

        <DocCard
          title="MQTT Integration"
          icon={<FileText />}
        />

        <DocCard
          title="Device Setup Guide"
          icon={<FileText />}
        />

      </div>

    </div>
  );
}

function DocCard({
  title,
  icon
}) {

  return (

    <div className="
      bg-[#071633]
      border
      border-white/10
      rounded-3xl
      p-6
      hover:border-[#ff5700]/40
      transition-all
      cursor-pointer
    ">

      <div className="
        text-[#ff5700]
        mb-4
      ">
        {icon}
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

    </div>
  );
}
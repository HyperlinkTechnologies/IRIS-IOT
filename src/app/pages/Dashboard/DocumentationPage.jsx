import {
  FileText,
  Download,
  BookOpen
} from "lucide-react";

export default function DocumentationPage() {

  return (

    <div className="w-full">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h2
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-[#010c29]
          "
        >
          Documentation
        </h2>

        <p
          className="
            text-gray-400
            mt-2
            text-sm
            sm:text-base
          "
        >
          Access setup guides and technical resources
        </p>

      </div>

      {/* ================= MAIN DOCUMENTATION CARD ================= */}

      <div
        className="
          bg-black/5

          border
          border-black/10

          shadow-md

          rounded-3xl

          p-5
          sm:p-6
          lg:p-10

          hover:shadow-lg

          transition-all
          duration-300
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row

            lg:items-center
            lg:justify-between

            gap-8
          "
        >

          {/* ================= LEFT CONTENT ================= */}

          <div
            className="
              flex
              flex-col
              sm:flex-row

              items-start

              gap-5
            "
          >

            {/* Icon */}
            <div
              className="
                w-16
                h-16

                rounded-2xl

                bg-orange-500/10

                flex
                items-center
                justify-center

                text-[#ff5700]

                shrink-0

                border
                border-orange-500/10
              "
            >

              <BookOpen size={28} />

            </div>

            {/* Text */}
            <div>

              <h3
                className="
                  text-2xl
                  sm:text-3xl

                  font-bold

                  mb-3

                  text-[#010c29]
                "
              >
                IRIS Documentation
              </h3>

              <p
                className="
                  text-gray-400

                  text-sm
                  sm:text-base

                  leading-relaxed

                  max-w-2xl
                "
              >
                Download the complete technical documentation,
                installation guide, API reference and setup
                manual for the IRIS Industrial IoT Platform.
              </p>

            </div>

          </div>

          {/* ================= DOWNLOAD BUTTON ================= */}

          <button
            className="
              w-full
              sm:w-auto

              flex
              items-center
              justify-center
              gap-3

              px-6
              sm:px-8

              py-3
              sm:py-4

              rounded-2xl

              bg-linear-to-r
              from-[#d84800]
              to-[#ff5700]

              hover:opacity-90
              hover:scale-[1.02]

              transition-all
              duration-300

              font-medium

              text-white

              cursor-pointer

              shadow-lg
            "
          >

            <Download size={20} />

            Download PDF

          </button>

        </div>

      </div>

      {/* ================= ADDITIONAL DOCS ================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3

          gap-4
          sm:gap-6

          mt-8
        "
      >

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

/* ================= DOC CARD ================= */

function DocCard({
  title,
  icon
}) {

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
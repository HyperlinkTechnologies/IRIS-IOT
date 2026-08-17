import { X, Download } from "lucide-react";

import { documentationContent }
from "../../core/documentation/documentationContent";

export default function DocumentationModal({

  docId,

  onClose,

}) {

  if (!docId) return null;

  const doc = documentationContent[docId];

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
      "
      onClick={onClose}
    >

      <div
  className="
    bg-white
    rounded-3xl
    w-full
    max-w-4xl
    max-h-[90vh]
    overflow-hidden
    flex
    flex-col
    mx-4
  "
  onClick={(e) => e.stopPropagation()}
>

        <div className="flex justify-between items-center m-6">

          <h2 className="text-3xl font-bold">

            {doc.title}

          </h2>

          <button onClick={onClose} className="cursor-pointer hover:bg-black/5 p-1.5 rounded-full">

            <X/>

          </button>

        </div>
        <div className="px-8 py-2 overflow-y-auto flex-1">

        {doc.sections.map((section) => (

  <div
    key={section.heading}
    className="mb-10"
  >

    <h3
      className="
        text-2xl
        font-semibold
        text-[#010c29]
        mb-4
      "
    >

      {section.heading}

    </h3>

    {(section.paragraphs || []).map((text, index) => (

      <p
        key={index}
        className="
          text-gray-600
          leading-8
          mb-4
        "
      >

        {text}

      </p>

    ))}

    {section.points && (

      <ul
        className="
          list-disc
          pl-6
          mt-4
          space-y-2
          text-gray-600
        "
      >

        {section.points.map((point, index) => (

          <li key={index}>

            {point}

          </li>

        ))}

      </ul>

    )}

    {section.note && (

  <div
    className="
      mt-6

      rounded-2xl

      border
      border-yellow-300

      bg-yellow-50

      p-4
    "
  >

    <p
      className="
        font-semibold
        text-yellow-700
        mb-2
      "
    >

      Note

    </p>

    <p className="text-gray-700">

      {section.note}

    </p>

  </div>

)}

    {section.downloads && (
      <div className="mt-6 space-y-4">
        {section.downloads.map((download) => (
          <div
            key={`${download.title}-${download.version}`}
            className="
              rounded-2xl
              border
              border-black/10
              bg-gray-50
              p-5
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-5
            "
          >
            <div>
              <h4 className="text-lg font-semibold text-[#010c29]">
                {download.title}
              </h4>

              <p className="text-gray-600 mt-1">
                {download.description}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Version {download.version} · {download.platform}
              </p>
            </div>

            <a
              href={download.href}
              download
              className="
                shrink-0
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-[#ff5700]
                text-white
                font-medium
                hover:bg-[#e64e00]
                transition
              "
            >
              <Download size={18} />
              Download SDK
            </a>
          </div>
        ))}
      </div>
    )}

{section.code && (

  <div className="mt-6">

    <h4
      className="
        font-semibold
        mb-2
      "
    >

      Example

    </h4>

    <pre
      className="
        bg-[#010c29]

        text-green-300

        rounded-2xl

        p-5

        overflow-x-auto

        text-sm
      "
    >

      <code>

        {section.code}

      </code>

    </pre>

  </div>

)}

  </div>

))}
</div>

      </div>

    </div>

  );

}
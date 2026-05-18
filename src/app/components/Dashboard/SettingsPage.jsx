import {
  User,
  Bell,
  Shield,
  Globe
} from "lucide-react";

export default function SettingsPage() {

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
          Settings
        </h2>

        <p
          className="
            text-gray-400
            mt-2
            text-sm
            sm:text-base
          "
        >
          Configure platform preferences
        </p>

      </div>

      {/* ================= SETTINGS GRID ================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          sm:gap-6
        "
      >

        <SettingsCard
          icon={<User />}
          title="Profile Settings"
          desc="Manage account details, profile information and user preferences."
        />

        <SettingsCard
          icon={<Bell />}
          title="Notifications"
          desc="Configure email alerts, push notifications and system warnings."
        />

        <SettingsCard
          icon={<Shield />}
          title="Security"
          desc="Manage passwords, authentication and device access permissions."
        />

        <SettingsCard
          icon={<Globe />}
          title="Platform Preferences"
          desc="Configure timezone, language and dashboard personalization options."
        />

      </div>

    </div>
  );
}

/* ================= SETTINGS CARD ================= */

function SettingsCard({
  icon,
  title,
  desc
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
        lg:p-8

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
          w-14
          h-14

          rounded-2xl

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
          text-xl
          sm:text-2xl

          font-bold

          mb-3

          text-[#010c29]
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          text-gray-400

          text-sm
          sm:text-base

          leading-relaxed
        "
      >
        {desc}
      </p>

    </div>
  );
}
import {
  User,
  Bell,
  Shield,
  Globe
} from "lucide-react";

export default function SettingsPage() {

  return (

    <div>

      {/* Header */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Settings
        </h2>

        <p className="text-gray-400 mt-1">
          Configure platform preferences
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">

        <SettingsCard
          icon={<User />}
          title="Profile Settings"
          desc="Manage account details and profile"
        />

        <SettingsCard
          icon={<Bell />}
          title="Notifications"
          desc="Configure alerts and notifications"
        />

        <SettingsCard
          icon={<Shield />}
          title="Security"
          desc="Manage passwords and access control"
        />

        <SettingsCard
          icon={<Globe />}
          title="Platform Preferences"
          desc="Language, timezone and dashboard options"
        />

      </div>

    </div>
  );
}

function SettingsCard({
  icon,
  title,
  desc
}) {

  return (

    <div className="
      bg-[#071633]
      border
      border-white/10
      rounded-3xl
      p-8
      hover:border-[#ff5700]/40
      transition-all
    ">

      <div className="
        w-14
        h-14
        rounded-2xl
        bg-orange-500/10
        flex
        items-center
        justify-center
        text-[#ff5700]
        mb-5
      ">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-gray-400">
        {desc}
      </p>

    </div>
  );
}
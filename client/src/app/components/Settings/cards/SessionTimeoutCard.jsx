import { Clock } from "lucide-react";

export default function SessionTimeoutCard({
  sessionTimeout,
  onChange,
}) {
  return (
    <div className="border rounded-xl p-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
          <Clock className="text-[#ff5700]" size={22} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            Session Timeout
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Automatically sign out after inactivity.
          </p>

          <div className="mt-5">
            <label className="block text-sm font-medium mb-2">
              Timeout Duration
            </label>

            <select
              value={sessionTimeout}
              onChange={(e) => onChange(e.target.value)}
              className="w-full border border-black/10 rounded-xl px-4 py-3"
            >
              <option value={5}>5 Minutes</option>
              <option value={10}>10 Minutes</option>
              <option value={15}>15 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={60}>1 Hour</option>
              <option value={120}>2 Hours</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
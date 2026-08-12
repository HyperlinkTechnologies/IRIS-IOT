import { TriangleAlert, ChevronRight } from "lucide-react";

export default function SubscriptionWarningCard({
  warning,
  onClick,
}) {

  if (!warning) return null;

  return (
    <div
  onClick={onClick}
  className="
    mb-4
    cursor-pointer
    rounded-xl
    border
    border-orange-300
    bg-orange-50
    px-5
    py-3
    flex
    items-center
    justify-between
    hover:bg-orange-100
    transition-all
    duration-200
  "
>

  <div className="flex items-center gap-3">

    <TriangleAlert
      className="text-orange-600"
      size={20}
    />

    <div>

      <p className="font-semibold text-orange-700">

  Live telemetry paused

</p>

<p className="text-sm text-orange-600">

  {warning.currentPlan.charAt(0).toUpperCase() +
  warning.currentPlan.slice(1)}{" "}
plan has reached its monthly{" "}
{warning.feature.toLowerCase()} limit.

</p>

<p className="mt-1 text-xs text-orange-500">

  Click to view upgrade options.

</p>

    </div>

  </div>

  <ChevronRight
    size={20}
    className="text-orange-600"
  />

</div>
  );

}
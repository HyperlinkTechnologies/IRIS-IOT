export default function UsageProgress({
  title,
  value,
  max,
  suffix = "",
}) {
  const safeValue = value ?? 0;
  const safeMax = max ?? 0;

  const isUnlimited = safeMax === -1;

  const percentage = isUnlimited
    ? 100
    : safeMax > 0
      ? Math.min((safeValue / safeMax) * 100, 100)
      : 0;

  let progressColor = "";

  if (isUnlimited) {
    progressColor = "bg-green-500";
  } else if (percentage >= 85) {
    progressColor = "bg-red-500";
  } else if (percentage >= 60) {
    progressColor = "bg-yellow-500";
  } else {
    progressColor = "bg-green-500";
  }

  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-between">
        <span className="font-medium">{title}</span>

        <div className="text-right">
          <div className="text-gray-500">
            {safeValue.toLocaleString()}
            {suffix}
            {" / "}
            {isUnlimited ? "Unlimited" : `${safeMax.toLocaleString()}${suffix}`}
          </div>

          <div className="text-xs font-semibold text-gray-600">
            {isUnlimited ? "Unlimited" : `${Math.round(percentage)}%`}
          </div>
        </div>
      </div>

      <div
        className="
          w-full
          h-4
          rounded-full
          bg-gray-200
          overflow-hidden
        "
      >
        <div
          style={{
            width: `${percentage}%`,
          }}
          className={`
            h-full
            rounded-full
            transition-all
            duration-500
            ${progressColor}
          `}
        />
      </div>
    </div>
  );
}
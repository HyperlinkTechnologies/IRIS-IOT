export default function StatusCard({ title, value, green, red, orange }) {
  return (
    <div
      className="
        bg-black/5
        border
        border-black/10
        rounded-3xl
        p-6
      "
    >
      <p className="text-gray-500">{title}</p>

      <h3
        className={`
          text-4xl
          font-bold
          mt-3

          ${
            green
              ? "text-green-500"
              : red
                ? "text-red-500"
                : orange
                  ? "text-orange-500"
                  : "text-[#010c29]"
          }
        `}
      >
        {value}
      </h3>
    </div>
  );
}

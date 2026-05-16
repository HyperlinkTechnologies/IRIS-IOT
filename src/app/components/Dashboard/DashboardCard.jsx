export default function DashboardCard({
  title,
  value
}) {

  return (

    <div className="
      p-6
      rounded-lg
      bg-black/5
      border
      border-gray-300
      shadow-lg
    ">

      <p className="text-gray-500 mb-2">
        {title}
      </p>

      <h3 className="text-4xl font-bold">
        {value}
      </h3>

    </div>
  );
}
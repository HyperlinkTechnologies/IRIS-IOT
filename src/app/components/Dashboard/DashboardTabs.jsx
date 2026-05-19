export default function DashboardTabs({
  dashboards,
  activeDashboard,
  setActiveDashboard,
}) {

  return (

    <div
      className="
        flex
        gap-4
        overflow-x-auto
        pb-2
        mb-6
      "
    >

      {dashboards.map((dashboard) => (

        <button
          key={dashboard.id}
          onClick={() =>
            setActiveDashboard(dashboard.id)
          }
          className={`
            px-5
            py-3
            rounded-2xl
            whitespace-nowrap
            transition-all
            cursor-pointer
            ${
              activeDashboard === dashboard.id
                ? "bg-[#ff5700] text-white"
                : "bg-black/5 text-[#010c29]"
            }
          `}
        >

          {dashboard.name}

        </button>

      ))}

    </div>
  );
}
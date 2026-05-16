import { LayoutDashboard } from "lucide-react";


export default function DashboardHome() {

  return (

    <>
      
      {/* Empty Dashboard */}
      <div className="
        border
        border-dashed
        border-gray-300
        rounded-3xl
        h-125
        flex
        flex-col
        items-center
        justify-center
        bg-black/5
      ">

        <LayoutDashboard
          size={60}
          className="text-[#ff5700] mb-4"
        />

        <h3 className="text-2xl font-bold mb-2">
          Dashboard is Empty
        </h3>

        <p className="text-gray-500 mb-6">
          Click the edit button to add widgets
        </p>

        <button
          className="
            px-6
            py-3
            rounded-xl
            bg-linear-to-r
            from-[#d84800]
            to-[#ff5700]
            hover:opacity-90
            transition-all
            text-white
            cursor-pointer
            hover:scale-103
            font-medium
          "
        >
          Edit Dashboard
        </button>

      </div>
    </>
  );
}
export default function SidebarItem({
  icon,
  text,
  active,
  onClick
}) {

  return (

    <button
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        gap-4
        px-4
        py-3
        rounded-xl
        transition-all
        duration-300
        ${
          active
            ? "bg-linear-to-r from-[#d84800] to-[#ff5700] text-white"
            : "hover:bg-black/10 text-[#010c29] cursor-pointer"
        }
      `}
    >

      {icon}

      <span className="font-medium ">
        {text}
      </span>

    </button>
  );
}
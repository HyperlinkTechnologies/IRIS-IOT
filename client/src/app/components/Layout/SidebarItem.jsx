export default function SidebarItem({
  icon,
  text,
  active,
  onClick,
  collapsed = false,
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? text : undefined}
      className={`
        w-full
        flex
        items-center
        ${collapsed ? "justify-center" : "justify-start"}
        gap-3
        px-3
        py-3
        rounded-xl
        cursor-pointer
        transition-all
        duration-200
        ${
          active
            ? "bg-[#ff5700] text-white"
            : "text-[#010c29] hover:bg-black/5"
        }
      `}
    >
      <span className="shrink-0">
        {icon}
      </span>

      {!collapsed && (
        <span className="font-medium whitespace-nowrap">
          {text}
        </span>
      )}
    </button>
  );
}
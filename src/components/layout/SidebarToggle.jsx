const SidebarToggle = ({ collapsed, setCollapsed }) => {
  return (
    <button
      className="hidden lg:flex items-center justify-center w-10 h-10 bg-[#0f1724] border border-white/40 text-white rounded-lg cursor-pointer text-2xl font-semibold hover:bg-red-700 hover:border-none transition-all active:scale-95"
      onClick={() => setCollapsed(!collapsed)}
      aria-label="Toggle sidebar"
    >
      {collapsed ? "»" : "«"}
    </button>
  );
};

export default SidebarToggle;

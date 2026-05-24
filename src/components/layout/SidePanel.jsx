import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ActivityDropdown from "./ActivityDropdown";
import SidebarToggle from "./SidebarToggle";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import moviesIcon from "../../assets/icons/movies.svg";
import webSeriesIcon from "../../assets/icons/webseries.svg";
import activityIcon from "../../assets/icons/activity.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import useClickOutside from "../../hooks/useClickOutside";
import { useMovies } from "../../context/MovieContext";

const SidePanel = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { resetCache } = useMovies();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const activityRef = useRef(null);

  useClickOutside(activityRef, () => {
    if (dropdownOpen) closeDropdown();
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      resetCache();
      navigate("/login");
      if (onClose) onClose();
    }
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Drawer Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Aside container */}
      <aside
        className={`h-full bg-[#16213d] flex flex-col justify-start transition-all duration-300 z-50
          /* Desktop behavior */
          lg:static lg:translate-x-0 lg:sticky lg:top-0
          ${collapsed ? "lg:w-20" : "lg:w-[310px]"}
          
          /* Mobile / Tablet behavioral overlay drawer */
          fixed top-0 left-0 w-[280px] max-w-[80vw] transform
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Close Button & Desktop Toggle Button */}
        <div className="flex justify-between items-center p-5 lg:justify-end">
          <span className="lg:hidden text-white font-bold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="lg:hidden text-white text-2xl font-bold focus:outline-none hover:text-red-500 cursor-pointer"
            aria-label="Close Menu"
          >
            ✕
          </button>
          <div className="hidden lg:block">
            <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
        </div>

        <ul className="flex flex-col gap-5 px-4 mt-2 flex-grow">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/dashboard"
              end
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-3.5 rounded-lg font-semibold text-white transition-colors duration-200 
                ${isActive ? "bg-red-700" : "bg-[#0f1724] hover:bg-red-700"}
                ${collapsed ? "lg:justify-center lg:px-0" : ""}
                `
              }
            >
              <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5" />
              <span className={`block transition-all lg:block ${collapsed ? "lg:hidden" : ""}`}>
                Dashboard
              </span>
            </NavLink>
          </li>

          {/* Movies */}
          <li>
            <NavLink
              to="/dashboard/movies"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-3.5 rounded-lg font-semibold text-white transition-colors duration-200 
                ${isActive ? "bg-red-700" : "bg-[#0f1724] hover:bg-red-700"}
                ${collapsed ? "lg:justify-center lg:px-0" : ""}
                `
              }
            >
              <img src={moviesIcon} alt="Movies" className="w-5 h-5" />
              <span className={`block transition-all lg:block ${collapsed ? "lg:hidden" : ""}`}>
                Movies
              </span>
            </NavLink>
          </li>

          {/* Web Series */}
          <li>
            <NavLink
              to="/dashboard/web-series"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-3.5 rounded-lg font-semibold text-white transition-colors duration-200 
                ${isActive ? "bg-red-700" : "bg-[#0f1724] hover:bg-red-700"}
                ${collapsed ? "lg:justify-center lg:px-0" : ""}
                `
              }
            >
              <img src={webSeriesIcon} alt="Web Series" className="w-5 h-5" />
              <span className={`block transition-all lg:block ${collapsed ? "lg:hidden" : ""}`}>
                Web Series
              </span>
            </NavLink>
          </li>

          {/* My Activity Dropdown */}
          <li ref={activityRef} className="relative">
            <div
              onClick={toggleDropdown}
              className={`flex items-center gap-5 px-5 py-3.5 rounded-lg font-semibold text-white bg-[#0f1724] hover:bg-red-700 transition-colors duration-200 cursor-pointer 
                ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
            >
              <img src={activityIcon} alt="Activity" className="w-5 h-5" />
              <span className={`block transition-all lg:block ${collapsed ? "lg:hidden" : ""}`}>
                My Activity
              </span>
              <div className={`ml-auto lg:block ${collapsed ? "lg:hidden" : ""}`}>
                <ActivityDropdown open={dropdownOpen} toggle={toggleDropdown} />
              </div>
            </div>
            {/* Mobile version drop anchor */}
            <div className="absolute right-0 top-0 lg:hidden">
              <ActivityDropdown open={dropdownOpen} toggle={toggleDropdown} />
            </div>
          </li>

          {/* Settings */}
          <li>
            <NavLink
              to="/dashboard/settings"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-3.5 rounded-lg font-semibold text-white transition-colors duration-200 
                ${isActive ? "bg-red-700" : "bg-[#0f1724] hover:bg-red-700"}
                ${collapsed ? "lg:justify-center lg:px-0" : ""}
                `
              }
            >
              <img src={settingsIcon} alt="Settings" className="w-5 h-5" />
              <span className={`block transition-all lg:block ${collapsed ? "lg:hidden" : ""}`}>
                Settings
              </span>
            </NavLink>
          </li>
        </ul>

        {/* Logout */}
        <div className="mt-auto px-4 pb-6">
          <div
            onClick={handleLogout}
            className={`flex items-center gap-5 px-5 py-3.5 rounded-lg font-semibold text-white bg-[#0f1724] hover:bg-red-700 transition-colors duration-200 cursor-pointer 
              ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
          >
            <img src={logoutIcon} alt="Logout" className="w-5 h-5" />
            <span className={`block transition-all lg:block ${collapsed ? "lg:hidden" : ""}`}>
              Logout
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidePanel;

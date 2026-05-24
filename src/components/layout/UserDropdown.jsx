import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { useMovies } from "../../context/MovieContext";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { resetCache } = useMovies();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useClickOutside(dropdownRef, () => setOpen(false));

  const options = ["View Profile", "My Favorites", "Profile Setting", "Logout"];

  const handleSelect = (item) => {
    setOpen(false);

    if (item === "Logout") {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        resetCache();
        navigate("/login");
      }
      return;
    }

    if (item === "View Profile") navigate("/dashboard/profile");
    if (item === "My Favorites") navigate("/dashboard/favorites");
    if (item === "Profile Setting") navigate("/dashboard/settings");
  };

  return (
    <div className="relative w-40 sm:w-48 md:w-56" ref={dropdownRef}>
      {/* Dropdown Header */}
      <div
        className="w-full h-10 md:h-12 bg-white rounded-lg px-3 flex items-center justify-between cursor-pointer text-slate-800 text-sm sm:text-base font-semibold shadow hover:bg-slate-100 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">{user?.fullname || "User"}</span>
        <img
          src="/src/assets/icons/dropdown.svg"
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          alt="dropdown"
        />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-12 md:top-14 left-0 w-full bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
          {options.map((item) => (
            <div
              key={item}
              className="px-4 py-3 text-sm md:text-base text-slate-700 hover:bg-red-700 hover:text-white cursor-pointer transition-colors font-medium"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

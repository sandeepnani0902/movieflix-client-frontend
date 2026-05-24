import { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";

const Navbar = ({ onMenuClick }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav
      className="
        w-full
        h-[80px]
        bg-[#0f172a]
        px-3
        sm:px-4
        md:px-6
        flex
        items-center
        justify-between
        shadow-lg
        border-b
        border-slate-800
      "
    >
      {/* Brand & Hamburger menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white text-2xl p-1 focus:outline-none hover:text-red-500 transition-colors cursor-pointer"
          aria-label="Open Menu"
        >
          ☰
        </button>

        <div className="flex-shrink-0">
          <h4
            className="
              text-red-500
              font-bold
              text-[20px]
              sm:text-[28px]
              md:text-[32px]
              lg:text-[42px]
              transition-all
              duration-300
              hover:text-white
              hover:scale-105
              cursor-pointer
            "
          >
            Movie Flix
          </h4>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
        {/* Avatar */}
        {user?.profile ? (
          <img
            src={user.profile}
            alt="profile"
            className="
              w-10
              h-10
              sm:w-11
              sm:h-11
              md:w-12
              md:h-12
              lg:w-[60px]
              lg:h-[60px]
              rounded-full
              object-cover
              border-2
              lg:border-4
              border-white
              transition-all
              duration-300
              hover:scale-110
              hover:border-red-500
              shadow-md
            "
          />
        ) : (
          <div
            className="
              w-10
              h-10
              sm:w-11
              sm:h-11
              md:w-12
              md:h-12
              lg:w-[60px]
              lg:h-[60px]
              rounded-full
              bg-gradient-to-br
              from-red-500
              to-red-700
              flex
              items-center
              justify-center
              text-white
              font-semibold
              text-base
              sm:text-lg
              md:text-xl
              lg:text-[26px]
              transition-all
              duration-300
              hover:scale-110
              border-2
              lg:border-4
              border-transparent
              hover:border-white
              shadow-md
            "
          >
            {user?.fullname
              ? user.fullname.charAt(0).toUpperCase()
              : "U"}
          </div>
        )}

        {/* Dropdown */}
        <UserDropdown user={user} />
      </div>
    </nav>
  );
};

export default Navbar;

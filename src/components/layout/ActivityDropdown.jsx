import dropdownSidePanelIcon from "../../assets/icons/dropdown-sidepanel.svg";
import bellIcon from "../../assets/icons/bell.png";
import { useNavigate } from "react-router-dom";

const ActivityDropdown = ({ open, toggle }) => {
  const navigate = useNavigate();

  const goToSubscription = (e) => {
    if (e) e.stopPropagation();
    navigate("/dashboard/subscription");
    if (toggle) toggle();
  };

  const goToFavorites = (e) => {
    if (e) e.stopPropagation();
    navigate("/dashboard/favorites");
    if (toggle) toggle();
  };

  return (
    <div className="relative flex items-center">
      <img
        src={dropdownSidePanelIcon}
        onClick={(e) => {
          if (e) e.stopPropagation();
          if (toggle) toggle();
        }}
        className={`w-3.5 h-2 cursor-pointer transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        alt="dropdown"
      />

      {open && (
        <div className="absolute top-8 right-0 w-44 bg-[#0f1724] border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
          <div
            className="flex items-center gap-3 px-4 py-3 hover:bg-red-700 text-white cursor-pointer transition-colors border-b border-slate-800"
            onClick={goToSubscription}
          >
            <img
              src={bellIcon}
              alt="subscription"
              className="w-5 h-5 object-contain"
            />
            <span className="text-sm font-semibold">Subscription</span>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-3 hover:bg-red-700 text-white cursor-pointer transition-colors"
            onClick={goToFavorites}
          >
            <span className="w-5 text-center text-sm">❤️</span>
            <span className="text-sm font-semibold">My Favorites</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDropdown;

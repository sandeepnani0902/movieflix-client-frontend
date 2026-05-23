import React, { useEffect, useState } from "react";
import { normalizeUrl } from "../../utils/urlHelper";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="w-full min-h-screen px-4 py-6 bg-[#0f172a] text-white">
      <h2 className="text-3xl font-bold text-white mb-8">My Profile</h2>
      
      <div className="max-w-2xl bg-[#16213d] rounded-2xl p-6 md:p-8 shadow-xl border border-white/5 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Profile Image Wrapper */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-red-500 shadow-lg flex-shrink-0 flex items-center justify-center bg-zinc-800">
            {user?.profile ? (
              <img
                src={normalizeUrl(user.profile)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl font-bold bg-gradient-to-br from-red-500 to-red-700 text-white">
                {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="flex-grow w-full space-y-4">
            {/* Full Name */}
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-400 font-medium">Full Name</span>
              <span className="font-semibold text-lg">{user?.fullname || "N/A"}</span>
            </div>

            {/* Email Address */}
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-400 font-medium">Email Address</span>
              <span className="font-semibold text-lg">{user?.email || "N/A"}</span>
            </div>

            {/* Mobile Number */}
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-400 font-medium">Mobile Number</span>
              <span className="font-semibold text-lg">{user?.mobile || "N/A"}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;

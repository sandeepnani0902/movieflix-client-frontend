const Settings = () => {
  return (
    <div className="w-full min-h-screen px-4 py-6 bg-[#0f172a] text-white">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Settings Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Profile Settings */}
        <div
          className="
            bg-[#1e293b]
            rounded-2xl
            p-6
            shadow-lg
            border
            border-white/5
          "
        >
          <h2 className="text-2xl font-semibold mb-6">
            Profile Settings
          </h2>

          <div className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="
                  w-full
                  bg-[#0f172a]
                  border
                  border-gray-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-red-500
                  transition
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  bg-[#0f172a]
                  border
                  border-gray-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-red-500
                  transition
                "
              />
            </div>

            {/* Save Button */}
            <button
              className="
                bg-red-500
                hover:bg-red-600
                transition
                px-6
                py-3
                rounded-xl
                font-medium
                shadow-lg
              "
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* App Preferences */}
        <div
          className="
            bg-[#1e293b]
            rounded-2xl
            p-6
            shadow-lg
            border
            border-white/5
          "
        >
          <h2 className="text-2xl font-semibold mb-6">
            Preferences
          </h2>

          <div className="space-y-6">
            
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  Notifications
                </h3>

                <p className="text-sm text-gray-400">
                  Receive movie updates and alerts
                </p>
              </div>

              <input
                type="checkbox"
                className="w-5 h-5 accent-red-500"
              />
            </div>

            {/* Auto Play */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  Auto Play
                </h3>

                <p className="text-sm text-gray-400">
                  Automatically play next episode
                </p>
              </div>

              <input
                type="checkbox"
                className="w-5 h-5 accent-red-500"
              />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  Dark Mode
                </h3>

                <p className="text-sm text-gray-400">
                  Enable dark theme appearance
                </p>
              </div>

              <input
                type="checkbox"
                checked
                readOnly
                className="w-5 h-5 accent-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

// import "./Settings.css";

// const Settings = () => {
//   return <div>Settings</div>;
// };

// export default Settings;

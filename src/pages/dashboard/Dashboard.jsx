import React, { useEffect } from "react";
import { useMovies } from "../../context/MovieContext";

const Dashboard = () => {
  const { languages, loadingLanguages, fetchLanguages } = useMovies();

  useEffect(() => {
    fetchLanguages();
  }, []);

  const formatLanguageName = (language) => {
    if (!language) return "Unknown";
    return language.charAt(0).toUpperCase() + language.slice(1);
  };

  if (loadingLanguages && !languages) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const languagesList = languages || [];

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>

      {languagesList.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No language metrics found.
          <button
            onClick={() => fetchLanguages(true)}
            className="mt-4 block mx-auto bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg text-white font-medium cursor-pointer"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div
          className="
            grid 
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4
            md:gap-6
          "
        >
          {languagesList.map((lang, index) => (
            <div
              key={index}
              className="
                h-[120px]
                md:h-[150px]
                lg:h-[170px]
                rounded-2xl
                bg-gradient-to-br
                from-[#1e293b]
                to-[#111827]
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                transition-all
                duration-300
                hover:-translate-y-2
                hover:scale-105
                hover:from-red-500
                hover:to-red-700
                shadow-lg
                border
                border-transparent
                hover:border-red-400
              "
            >
              <div className="text-center">
                <p
                  className="
                    text-white
                    font-semibold
                    text-lg
                    sm:text-xl
                    md:text-2xl
                    lg:text-3xl
                  "
                >
                  {formatLanguageName(lang.language)}
                </p>

                <p
                  className="
                    text-gray-300
                    text-xs
                    sm:text-sm
                    md:text-base
                    mt-1
                  "
                >
                  {lang.count || 0} movies
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:2025/movieflix/languages"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setLanguages(data.data || []);
    } catch (err) {
      console.error("Error fetching languages:", err);
      setError("Failed to load languages. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchLanguages();
  };

  const formatLanguageName = (language) => {
    if (!language) return "Unknown";

    return language.charAt(0).toUpperCase() + language.slice(1);
  };

  if (loading) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-white mb-8">
          Dashboard
        </h2>

        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-white mb-8">
          Dashboard
        </h2>

        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>

          <button
            onClick={handleRetry}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold text-white mb-8">
        Dashboard
      </h2>

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
        {languages.map((lang, index) => (
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
    </div>
  );
};

export default Dashboard;
// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [languages, setLanguages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchLanguages();
//   }, []);

//   const fetchLanguages = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch("http://localhost:2025/movieflix/languages");
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setLanguages(data.data || []);
//     } catch (err) {
//       console.error("Error fetching languages:", err);
//       setError("Failed to load languages. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRetry = () => {
//     fetchLanguages();
//   };

//   const formatLanguageName = (language) => {
//     if (!language) return "Unknown";
//     return language.charAt(0).toUpperCase() + language.slice(1);
//   };

//   if (loading) {
//     return (
//       <>
//         <h2 className="title-category">Dashboard</h2>
//         <div className="dashboard-loading">
//           <div className="loading-spinner"></div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <h2 className="title-category">Dashboard</h2>
//         <div className="dashboard-error">
//           <p>{error}</p>
//           <button 
//             onClick={handleRetry}
//             style={{
//               background: "var(--accent-color)",
//               color: "white",
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "var(--border-radius)",
//               cursor: "pointer",
//               marginTop: "10px"
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <h2 className="title-category">Dashboard</h2>
//       <div className="dashboard-container">
//         <div className="language-grid">
//           {languages.map((lang, index) => (
//             <div key={index} className="language-card">
//               <div className="lang-text">
//                 <p className="lang-name">{formatLanguageName(lang.language)}</p>
//                 <p className="lang-sub">{lang.count || 0} movies</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

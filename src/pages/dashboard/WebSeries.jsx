import { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/PosterCard";
import SearchBar from "../../components/searchBar/SearchBar";

const WebSeries = () => {
  const [webSeries, setWebSeries] = useState([]);
  const [filteredWebSeries, setFilteredWebSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWebSeries();
  }, []);

  const fetchWebSeries = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl =
        import.meta.env.VITE_API_URL || "http://localhost:2025";

      const response = await fetch(
        `${baseUrl}/movieflix/webseries`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      const seriesData = data.data || [];

      setWebSeries(seriesData);
      setFilteredWebSeries(seriesData);
    } catch (err) {
      console.error("Error fetching web series:", err);

      setError(
        "Failed to load web series. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredWebSeries(webSeries);
      return;
    }

    const filtered = webSeries.filter(
      (series) =>
        series.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        series.genre
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        series.language
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    setFilteredWebSeries(filtered);
  };

  const handleRetry = () => {
    fetchWebSeries();
  };

  /* Loading */
  if (loading) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-white mb-6">
          Web Series
        </h2>

        <div className="flex justify-center items-center h-[300px]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-white mb-6">
          Web Series
        </h2>

        <div className="flex flex-col items-center justify-center h-[300px]">
          <p className="text-red-400 mb-4">
            {error}
          </p>

          <button
            onClick={handleRetry}
            className="
              bg-red-500
              hover:bg-red-600
              transition
              px-5
              py-2
              rounded-lg
              text-white
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      
      {/* Title */}
      <h2 className="text-3xl font-bold text-white mb-6">
        Web Series
      </h2>

      {/* Search */}
      {webSeries.length > 0 && (
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search web series by title, genre, or language..."
          />
        </div>
      )}

      {/* Empty Search */}
      {filteredWebSeries.length === 0 &&
      webSeries.length > 0 ? (
        <div className="flex justify-center items-center h-[250px]">
          <p className="text-gray-400">
            No web series found matching your search.
          </p>
        </div>
      ) : filteredWebSeries.length === 0 ? (
        
        /* No Data */
        <div className="flex justify-center items-center h-[250px]">
          <p className="text-gray-400">
            No web series available at the moment.
          </p>
        </div>
      ) : (
        
        /* Grid */
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6
          "
        >
          {filteredWebSeries.map((series) => (
            <MovieCard
              key={series._id}
              movie={series}
              isWebSeries={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WebSeries;

// import { useEffect, useState } from "react";
// import MovieCard from "../../components/movieCard/MovieCard";
// import SearchBar from "../../components/searchBar/SearchBar";
// import "./WebSeries.css";

// const WebSeries = () => {
//   const [webSeries, setWebSeries] = useState([]);
//   const [filteredWebSeries, setFilteredWebSeries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchWebSeries();
//   }, []);

//   const fetchWebSeries = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:2025";
//         const baseUrl= "http://localhost:2025"
//       const response = await fetch(`${baseUrl}/movieflix/webseries`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       const seriesData = data.data || [];
//       setWebSeries(seriesData);
//       setFilteredWebSeries(seriesData);
//     } catch (err) {
//       console.error("Error fetching web series:", err);
//       setError("Failed to load web series. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (searchTerm) => {
//     if (!searchTerm.trim()) {
//       setFilteredWebSeries(webSeries);
//       return;
//     }
    
//     const filtered = webSeries.filter(series => 
//       series.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       series.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       series.language?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredWebSeries(filtered);
//   };

//   const handleRetry = () => {
//     fetchWebSeries();
//   };

//   if (loading) {
//     return (
//       <div>
//         <h2 className="title-category">Web Series</h2>
//         <div className="webseries-loading">
//           <div className="loading-spinner"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <h2 className="title-category">Web Series</h2>
//         <div className="webseries-error">
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
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="title-category">Web Series</h2>
      
//       {webSeries.length > 0 && (
//         <div className="search-container">
//           <SearchBar 
//             onSearch={handleSearch}
//             placeholder="Search web series by title, genre, or language..."
//           />
//         </div>
//       )}
      
//       {filteredWebSeries.length === 0 && webSeries.length > 0 ? (
//         <div className="webseries-empty">
//           <p>No web series found matching your search.</p>
//         </div>
//       ) : filteredWebSeries.length === 0 ? (
//         <div className="webseries-empty">
//           <p>No web series available at the moment.</p>
//         </div>
//       ) : (
//         <div className="webseries-container">
//           {filteredWebSeries.map((series) => (
//             <MovieCard key={series._id} movie={series} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebSeries;

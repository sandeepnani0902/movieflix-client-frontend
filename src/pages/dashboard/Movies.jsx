


import { useEffect, useState } from "react";
import PosterCard from "../../components/movieCard/PosterCard";
import SearchBar from "../../components/searchBar/SearchBar";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use environment variable or fallback to localhost
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:2025";
      const response = await fetch(`${baseUrl}/movieflix/movies`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const movieData = data.data || [];
      setMovies(movieData);
      setFilteredMovies(movieData);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredMovies(movies);
      return;
    }
    
    const filtered = movies.filter(movie => 
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.language?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleRetry = () => {
    fetchMovies();
  };

  if (loading) {
    return (
      <div>
        <h2 className="title-category">New Releases</h2>
        <div className="movies-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <h2 className="title-category">New Releases</h2>
        <div className="movies-error">
          <p>{error}</p>
          <button 
            onClick={handleRetry}
            style={{
              background: "var(--accent-color)",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "var(--border-radius)",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
  <div className="w-full px-4 py-6">
    
    <h2 className="text-3xl font-bold text-white mb-6">
      New Releases
    </h2>

    {movies.length > 0 && (
      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search movies by title, genre, or language..."
        />
      </div>
    )}

    {filteredMovies.length === 0 && movies.length > 0 ? (
      <div className="flex justify-center items-center h-[250px]">
        <p className="text-gray-400">
          No movies found matching your search.
        </p>
      </div>
    ) : filteredMovies.length === 0 ? (
      <div className="flex justify-center items-center h-[250px]">
        <p className="text-gray-400">
          No movies available at the moment.
        </p>
      </div>
    ) : (
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
        {filteredMovies.map((movie) => (
          <PosterCard
            movie={movie}
            key={movie._id}
          />
        ))}
      </div>
    )}
  </div>
);
  // return (
  //   // <div className="w-full overflow-y-hidden">
  //   //   <h2 className="title-category">New Releases</h2>
      
  //   //   {movies.length > 0 && (
  //   //     <div className="search-container">
  //   //       <SearchBar 
  //   //         onSearch={handleSearch}
  //   //         placeholder="Search movies by title, genre, or language..."
  //   //       />
  //   //     </div>
  //   //   )}
      
  //   //   {filteredMovies.length === 0 && movies.length > 0 ? (
  //   //     <div className="movies-empty">
  //   //       <p>No movies found matching your search.</p>
  //   //     </div>
  //   //   ) : filteredMovies.length === 0 ? (
  //   //     <div className="movies-empty">
  //   //       <p>No movies available at the moment.</p>
  //   //     </div>
  //   //   ) : (
  //   //     <div className="movies-container">
  //   //       {filteredMovies.map((movie) => (
  //   //         <MovieCard key={movie._id} movie={movie} />
  //   //       ))}
  //   //     </div>
  //   //   )}
  //   // </div>
  //   <div className="w-full">
  //       {movies.length > 0 && (
  //     <div className="p-4">
  //        <SearchBar 
  //           onSearch={handleSearch}
  //            placeholder="Search movies by title, genre, or language..."
  //          />
  //        <div className="grid grid-cols gap-4">
  //          {movies.map((movie,index)=>{
  //          return <MovieCard movie={movie} key={movie._id} />
  //          })}
            
  //        </div>
  //     </div>
  //     )}
  //   </div>
  // );
};

export default Movies;

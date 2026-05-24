import { useEffect, useState } from "react";
import PosterCard from "../../components/common/PosterCard";
import SearchBar from "../../components/common/SearchBar";
import { useMovies } from "../../context/MovieContext";

const Movies = () => {
  const { movies, loadingMovies, fetchMovies } = useMovies();
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    loadMoviesData();
  }, [movies]);

  const loadMoviesData = async () => {
    const list = await fetchMovies();
    setFilteredMovies(list || []);
  };

  const handleSearch = (searchTerm) => {
    const allMovies = movies || [];
    if (!searchTerm.trim()) {
      setFilteredMovies(allMovies);
      return;
    }

    const filtered = allMovies.filter(
      (movie) =>
        movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.language?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleRetry = () => {
    fetchMovies(true);
  };

  if (loadingMovies && !movies) {
    return (
      <div className="w-full px-4 py-6">
        <h2 className="text-3xl font-bold text-white mb-6">New Releases</h2>
        <div className="flex justify-center items-center h-[300px]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const allMovies = movies || [];

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-3xl font-bold text-white mb-6">New Releases</h2>

      {allMovies.length > 0 && (
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search movies by title, genre, or language..."
          />
        </div>
      )}

      {filteredMovies.length === 0 && allMovies.length > 0 ? (
        <div className="flex justify-center items-center h-[250px]">
          <p className="text-gray-400">No movies found matching your search.</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="flex justify-center items-center h-[250px] flex-col">
          <p className="text-gray-400 mb-4">No movies available at the moment.</p>
          <button
            onClick={handleRetry}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg text-white font-medium cursor-pointer"
          >
            Try Again
          </button>
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
            <PosterCard movie={movie} key={movie._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;

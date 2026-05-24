import { useEffect, useState } from "react";
import PosterCard from "../../components/common/PosterCard";
import SearchBar from "../../components/common/SearchBar";
import { useMovies } from "../../context/MovieContext";

const WebSeries = () => {
  const { webSeries, loadingWebSeries, fetchWebSeries } = useMovies();
  const [filteredWebSeries, setFilteredWebSeries] = useState([]);

  useEffect(() => {
    loadWebSeriesData();
  }, [webSeries]);

  const loadWebSeriesData = async () => {
    const list = await fetchWebSeries();
    setFilteredWebSeries(list || []);
  };

  const handleSearch = (searchTerm) => {
    const allSeries = webSeries || [];
    if (!searchTerm.trim()) {
      setFilteredWebSeries(allSeries);
      return;
    }

    const filtered = allSeries.filter(
      (series) =>
        series.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        series.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        series.language?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredWebSeries(filtered);
  };

  const handleRetry = () => {
    fetchWebSeries(true);
  };

  if (loadingWebSeries && !webSeries) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-white mb-6">Web Series</h2>
        <div className="flex justify-center items-center h-[300px]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const allSeries = webSeries || [];

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-3xl font-bold text-white mb-6">Web Series</h2>

      {allSeries.length > 0 && (
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search web series by title, genre, or language..."
          />
        </div>
      )}

      {filteredWebSeries.length === 0 && allSeries.length > 0 ? (
        <div className="flex justify-center items-center h-[250px]">
          <p className="text-gray-400">No web series found matching your search.</p>
        </div>
      ) : filteredWebSeries.length === 0 ? (
        <div className="flex justify-center items-center h-[250px] flex-col">
          <p className="text-gray-400 mb-4">No web series available at the moment.</p>
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
          {filteredWebSeries.map((series) => (
            <PosterCard
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

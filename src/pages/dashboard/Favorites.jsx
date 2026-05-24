import { useEffect } from "react";
import PosterCard from "../../components/common/PosterCard";
import { useMovies } from "../../context/MovieContext";

const Favorites = () => {
  const { favorites, loadingFavorites, fetchFavorites, toggleFavoriteItem } = useMovies();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (fav) => {
    try {
      const mediaItem = {
        _id: fav.mediaId,
        title: fav.title,
        image: fav.image,
        genre: fav.genre,
        language: fav.language,
      };
      await toggleFavoriteItem(mediaItem, fav.mediaType || "movie");
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  if (loadingFavorites && !favorites) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-3xl font-bold text-white mb-6">My Favorites</h2>
        <div className="flex justify-center items-center h-[300px]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const favoritesList = favorites || [];

  return (
    <div className="w-full px-4 py-6 bg-[#0f172a] min-h-screen text-white">
      <h2 className="text-3xl font-bold text-white mb-6">My Favorites</h2>

      {favoritesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[300px] text-zinc-400">
          <span className="text-6xl mb-4">❤️</span>
          <p className="text-lg font-medium">Your favorites list is empty.</p>
          <p className="text-sm mt-1 text-zinc-500">Explore movies and series to add them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoritesList.map((fav) => {
            const mediaItem = {
              _id: fav.mediaId,
              title: fav.title,
              image: fav.image,
              genre: fav.genre,
              language: fav.language,
            };
            return (
              <div key={fav._id} className="relative group">
                <PosterCard
                  movie={mediaItem}
                  isWebSeries={fav.mediaType === "webseries"}
                />
                <button
                  onClick={() => handleRemove(fav)}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-base transition-colors shadow-lg cursor-pointer z-10 active:scale-90"
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;

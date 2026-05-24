import { useEffect, useState } from "react";
import { normalizeUrl } from "../../utils/urlHelper";
import { useNavigate, useParams } from "react-router-dom";
import MediaViewer from "../../components/common/MediaViewer";
import { useMovies } from "../../context/MovieContext";

export const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    movies,
    favorites,
    subscription,
    fetchMovies,
    fetchFavorites,
    fetchSubscriptionStatus,
    toggleFavoriteItem,
  } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openmedia, setOpenMedia] = useState(false);
  const [media, setMedia] = useState({
    url: "",
    type: "",
    title: "",
  });

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dependencies in parallel to populate cache
        let currentMovies = movies;
        if (!currentMovies) {
          currentMovies = await fetchMovies();
        }

        const selectedMovie = currentMovies.find((m) => m._id === id);
        if (!selectedMovie) {
          throw new Error("Movie not found");
        }

        setMovie(selectedMovie);
        await Promise.all([fetchFavorites(), fetchSubscriptionStatus()]);
      } catch (err) {
        console.error("Error loading movie details:", err);
        setError(err.message || "Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [id, movies]);

  const isFavorited = favorites ? favorites.some((fav) => fav.mediaId === id) : false;

  const handleToggleFavorite = async () => {
    if (!movie) return;
    try {
      const favorited = await toggleFavoriteItem(movie, "movie");
      alert(favorited ? "Added to favorites" : "Removed from favorites");
    } catch (err) {
      console.error("Error toggling favorite status:", err);
      alert("Failed to update favorites.");
    }
  };

  const handleWatchNow = async () => {
    if (!movie) return;
    try {
      let subStatus = subscription;
      if (!subStatus) {
        subStatus = await fetchSubscriptionStatus(true);
      }

      if (subStatus?.subscribed) {
        setMedia({
          url: movie.videourl,
          type: "video",
          title: movie.title,
        });
        setOpenMedia(true);
      } else {
        alert("A premium subscription is required to watch this video. Redirecting to subscription plans.");
        navigate("/dashboard/subscription");
      }
    } catch (err) {
      console.error("Subscription check error:", err);
      alert("Could not verify subscription. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a]">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0f172a] text-red-500 text-xl">
        <p className="mb-4">{error || "Movie not found"}</p>
        <button
          onClick={() => navigate("/dashboard/movies")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-base cursor-pointer"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  const bannerUrl = normalizeUrl(movie.banner);

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white">
      {/* Banner Section */}
      <div
        className="relative w-full h-[40vh] md:h-[55vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerUrl})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/movies")}
          className="absolute top-5 left-5 z-20 bg-black/60 hover:bg-red-500 transition px-4 py-2 rounded-lg text-white font-medium cursor-pointer"
        >
          ← Back
        </button>

        {/* Movie Poster */}
        <div className="absolute bottom-[-80px] left-6 md:left-10 z-20">
          <img
            src={normalizeUrl(movie.image)}
            alt={movie.title}
            className="w-[160px] md:w-[240px] h-[240px] md:h-[360px] object-cover rounded-2xl shadow-2xl border-4 border-white/10"
          />
        </div>
      </div>

      {/* Movie Content */}
      <div className="pt-[100px] md:pt-[120px] px-6 md:px-10 pb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-300 mb-6">
          <span>🎬 {movie.genre}</span>
          <span>🌐 {movie.language}</span>
          <span>📅 {movie.releaseYear}</span>
        </div>

        <p className="text-gray-300 leading-8 max-w-4xl text-base md:text-lg">
          {movie.description}
        </p>

        {/* Watch and Favorite Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            className="bg-red-600 hover:bg-red-700 active:scale-95 transition-all px-8 py-3 rounded-xl text-white font-semibold text-lg shadow-lg cursor-pointer"
            onClick={handleWatchNow}
          >
            ▶ Watch Now
          </button>

          <button
            onClick={handleToggleFavorite}
            className={`px-8 py-3 rounded-xl font-semibold text-lg shadow-lg cursor-pointer transition-all active:scale-95 border ${
              isFavorited
                ? "bg-slate-750 text-red-500 border-red-500 hover:bg-slate-700"
                : "bg-slate-800 text-white border-zinc-700 hover:bg-zinc-700"
            }`}
          >
            {isFavorited ? "♥ Favorited" : "♡ Add to Favorite"}
          </button>
        </div>
      </div>

      {openmedia && (
        <MediaViewer media={media} onClose={() => setOpenMedia(false)} />
      )}
    </div>
  );
};

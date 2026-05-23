import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { normalizeUrl } from "../../utils/urlHelper";
import api from "../../api/api";

const WebSeriesDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [series, setSeries] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetchSeries();
    checkFavoriteStatus();
  }, [id]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await api.get(`/favorites/check/${id}`);
      setIsFavorited(response.data.favorited);
    } catch (err) {
      console.error("Error checking favorite status:", err);
    }
  };

  const handleToggleFavorite = async () => {
    if (!series) return;
    try {
      const response = await api.post("/favorites/toggle", {
        mediaId: series._id,
        mediaType: "webseries",
        title: series.title,
        image: series.image,
        genre: series.genre,
        language: series.language,
      });
      setIsFavorited(response.data.favorited);
      alert(response.data.message);
    } catch (err) {
      console.error("Error toggling favorite status:", err);
      alert(err.response?.data?.message || "Failed to update favorites.");
    }
  };

  const fetchSeries = async () => {
    const response = await fetch(
      "http://localhost:2025/movieflix/webseries"
    );

    const data = await response.json();

    const selected = data.data.find(
      (item) => item._id === id
    );

    setSeries(selected);
  };

  if (!series) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen bg-[#0f172a]">
      
      {/* Banner */}
      <div
        className="
          relative
          h-[50vh]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${normalizeUrl(
            series.banner
          )})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <button
          onClick={() =>
            navigate("/dashboard/web-series")
          }
          className="
            absolute
            top-5
            left-5
            z-20
            bg-red-500
            px-4
            py-2
            rounded-lg
          "
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        
        <div className="flex gap-6 flex-wrap">
          
          <img
            src={normalizeUrl(series.image)}
            alt=""
            className="
              w-[220px]
              h-[320px]
              rounded-xl
              object-cover
            "
          />

          <div>
            <h1 className="text-4xl font-bold">
              {series.title}
            </h1>

            <p className="mt-4 text-gray-300 max-w-3xl">
              {series.description}
            </p>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex gap-4 text-sm text-gray-400">
                <span>🎬 {series.genre}</span>
                <span>🌐 {series.language}</span>
              </div>
              <button
                onClick={handleToggleFavorite}
                className={`
                  w-fit
                  px-6
                  py-2.5
                  rounded-xl
                  font-semibold
                  text-sm
                  shadow-lg
                  cursor-pointer
                  transition-all
                  active:scale-95
                  border
                  ${
                    isFavorited
                      ? "bg-slate-755 bg-slate-750 text-red-500 border-red-500 hover:bg-slate-700"
                      : "bg-slate-800 text-white border-zinc-700 hover:bg-zinc-700"
                  }
                `}
              >
                {isFavorited ? "♥ Favorited" : "♡ Add to Favorite"}
              </button>
            </div>
          </div>
        </div>

        {/* Seasons */}
        <div className="mt-12">
          
          <h2 className="text-3xl font-bold mb-6">
            Seasons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {series.seasons.map((season) => (
              <div
                key={season.seasonNumber}
                onClick={() =>
                  navigate(
                    `/dashboard/web-series/${id}/season/${season.seasonNumber}`
                  )
                }
                className="
                  bg-[#1e293b]
                  rounded-xl
                  overflow-hidden
                  cursor-pointer
                  hover:scale-105
                  transition
                "
              >
                <img
                  src={normalizeUrl(season.image)}
                  alt=""
                  className="
                    w-full
                    h-[220px]
                    object-cover
                  "
                />

                <div className="p-4">
                  <h3 className="text-2xl font-bold">
                    {season.title}
                  </h3>

                  <p className="text-gray-400">
                    {
                      season.episodes.length
                    }{" "}
                    Episodes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSeriesDetails;
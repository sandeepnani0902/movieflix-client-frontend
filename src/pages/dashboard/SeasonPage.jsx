import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { normalizeUrl } from "../../utils/urlHelper";
import { useMovies } from "../../context/MovieContext";

const SeasonPage = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();

  const { webSeries, fetchWebSeries } = useMovies();
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);

        let currentSeriesList = webSeries;
        if (!currentSeriesList) {
          currentSeriesList = await fetchWebSeries();
        }

        const series = currentSeriesList?.find((item) => item._id === id);
        if (!series) {
          throw new Error("Web series not found");
        }

        const selectedSeason = series?.seasons?.find(
          (s) => s.seasonNumber == seasonNumber
        );
        if (!selectedSeason) {
          throw new Error("Season not found");
        }

        setSeason(selectedSeason);
      } catch (err) {
        console.error("Error loading season details:", err);
        setError(err.message || "Unable to load season.");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [id, seasonNumber, webSeries]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !season) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0f172a] text-red-500 text-xl">
        <p className="mb-4">{error || "Season not found"}</p>
        <button
          onClick={() => navigate(`/dashboard/web-series/${id}`)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-base cursor-pointer"
        >
          Back to Series Details
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button
        onClick={() => navigate(`/dashboard/web-series/${id}`)}
        className="bg-red-500 px-4 py-2 rounded-lg mb-6 cursor-pointer hover:bg-red-600 transition"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">{season?.title}</h1>

      {season?.episodes ? <div className="grid md:grid-cols-3 gap-6">
        {season?.episodes?.map((episode) => (
          <div
            key={episode?.episodeNumber}
            onClick={() =>
              navigate(
                `/dashboard/web-series/${id}/season/${seasonNumber}/episode/${episode?.episodeNumber}`
              )
            }
            className="bg-[#1e293b] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition"
          >
            <img
              src={normalizeUrl(episode?.banner)}
              alt=""
              className="w-full h-[220px] object-cover"
            />

            <div className="p-4">
              <h2 className="text-2xl font-bold">{episode?.title}</h2>
              <p className="text-gray-400">Episode {episode?.episodeNumber}</p>
            </div>
          </div>
        ))}
      </div> : <div className=" bg-[#0f172a] text-white text-xl">
        Episodes are coming soon...
      </div>}
    </div>
  );
};

export default SeasonPage;
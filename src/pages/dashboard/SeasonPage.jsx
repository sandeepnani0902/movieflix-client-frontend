import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { normalizeUrl } from "../../utils/urlHelper";

const SeasonPage = () => {
  const { id, seasonNumber } = useParams();

  const navigate = useNavigate();

  const [season, setSeason] = useState(null);

  useEffect(() => {
    fetchSeason();
  }, []);

  const fetchSeason = async () => {
    const response = await fetch(
      "http://localhost:2025/movieflix/webseries"
    );

    const data = await response.json();

    const series = data.data.find(
      (item) => item._id === id
    );

    const selectedSeason =
      series.seasons.find(
        (s) =>
          s.seasonNumber ==
          seasonNumber
      );

    setSeason(selectedSeason);
  };

  if (!season) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      
      <button
        onClick={() =>
          navigate(`/dashboard/web-series/${id}`)
        }
        className="
          bg-red-500
          px-4
          py-2
          rounded-lg
          mb-6
        "
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        {season.title}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        
        {season.episodes.map((episode) => (
          <div
            key={episode.episodeNumber}
            onClick={() =>
              navigate(
                `/dashboard/web-series/${id}/season/${seasonNumber}/episode/${episode.episodeNumber}`
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
              src={normalizeUrl(
                episode.banner
              )}
              alt=""
              className="
                w-full
                h-[220px]
                object-cover
              "
            />

            <div className="p-4">
              
              <h2 className="text-2xl font-bold">
                {episode.title}
              </h2>

              <p className="text-gray-400">
                Episode{" "}
                {episode.episodeNumber}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonPage;
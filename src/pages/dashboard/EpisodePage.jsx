import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MediaViewer from "../../components/common/MediaViewer";
import { normalizeUrl } from "../../utils/urlHelper";
import { useMovies } from "../../context/MovieContext";

const EpisodePage = () => {
  const { id, seasonNumber, episodeNumber } = useParams();
  const navigate = useNavigate();

  const {
    webSeries,
    subscription,
    fetchWebSeries,
    fetchSubscriptionStatus,
  } = useMovies();

  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMedia, setOpenMedia] = useState(false);
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

        let currentSeriesList = webSeries;
        if (!currentSeriesList) {
          currentSeriesList = await fetchWebSeries();
        }

        const series = currentSeriesList.find((item) => item._id === id);
        if (!series) {
          throw new Error("Web series not found");
        }

        const season = series.seasons.find((s) => s.seasonNumber == seasonNumber);
        if (!season) {
          throw new Error("Season not found");
        }

        const selectedEpisode = season.episodes.find(
          (ep) => ep.episodeNumber == episodeNumber
        );
        if (!selectedEpisode) {
          throw new Error("Episode not found");
        }

        setEpisode(selectedEpisode);
        await fetchSubscriptionStatus();
      } catch (err) {
        console.error("Error loading episode details:", err);
        setError(err.message || "Unable to load episode.");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [id, seasonNumber, episodeNumber, webSeries]);

  const handleWatchEpisode = async () => {
    if (!episode) return;
    try {
      let subStatus = subscription;
      if (!subStatus) {
        subStatus = await fetchSubscriptionStatus(true);
      }

      if (subStatus?.subscribed) {
        setMedia({
          url: episode.videourl,
          type: "video",
          title: episode.title,
        });
        setOpenMedia(true);
      } else {
        alert("A premium subscription is required to watch this episode. Redirecting to subscription plans.");
        navigate("/dashboard/subscription");
      }
    } catch (err) {
      console.error("Subscription check error:", err);
      alert("Could not verify subscription. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a] text-white">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0f172a] text-red-500 text-xl">
        <p className="mb-4">{error || "Episode not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-base cursor-pointer"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-3">
      <button
        className="px-4 py-2 bg-red-650 bg-red-900 rounded-lg text-center m-2 cursor-pointer hover:bg-red-800 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Banner */}
      <div
        className="h-[50vh] bg-cover bg-center relative rounded-xl overflow-hidden mt-2"
        style={{
          backgroundImage: `url(${normalizeUrl(episode.banner)})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h1 className="text-4xl font-bold">{episode.title}</h1>

        <button
          onClick={handleWatchEpisode}
          className="
            mt-8
            bg-red-600
            hover:bg-red-700
            px-8
            py-3
            rounded-xl
            text-lg
            font-bold
            active:scale-95
            transition-all
            cursor-pointer
          "
        >
          ▶ Watch Episode
        </button>
      </div>

      {openMedia && (
        <MediaViewer media={media} onClose={() => setOpenMedia(false)} />
      )}
    </div>
  );
};

export default EpisodePage;
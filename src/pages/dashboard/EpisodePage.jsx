import { useEffect, useState,  } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import MediaViewer from "../../components/MediaViewer";
import { normalizeUrl } from "../../utils/urlHelper";
import api from "../../api/api";

const EpisodePage = () => {
  const { id, seasonNumber, episodeNumber } =
    useParams();

  const [episode, setEpisode] =
    useState(null);

  const [openMedia, setOpenMedia] =
    useState(false);

  const [media, setMedia] = useState({
    url: "",
    type: "",
    title: "",
  });
  const navigate= useNavigate()

  useEffect(() => {
    fetchEpisode();
  }, []);

  const fetchEpisode = async () => {
    const response = await fetch(
      "http://localhost:2025/movieflix/webseries"
    );

    const data = await response.json();

    const series = data.data.find(
      (item) => item._id === id
    );

    const season = series.seasons.find(
      (s) =>
        s.seasonNumber ==
        seasonNumber
    );

    const selectedEpisode =
      season.episodes.find(
        (ep) =>
          ep.episodeNumber ==
          episodeNumber
      );

    setEpisode(selectedEpisode);
  };

  if (!episode) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }
  function handleclose(){
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-3">
      <button className="w-[50px] bg-red-900 rounded-half text-center m-2" onClick={handleclose}>
      close
    </button>
      {/* Banner */}
      <div
        className="
          h-[50vh]
          bg-cover
          bg-center
          relative
        "
        style={{
          backgroundImage: `url(${normalizeUrl(
            episode.banner
          )})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        
        <h1 className="text-4xl font-bold">
          {episode.title}
        </h1>

        <button
          onClick={async () => {
            try {
              const response = await api.get("/subscription/status");
              if (response.data.subscribed) {
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
          }}
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
        <MediaViewer
          media={media}
          onClose={() =>
            setOpenMedia(false)
          }
        />
      )}
    </div>
  );
};

export default EpisodePage;
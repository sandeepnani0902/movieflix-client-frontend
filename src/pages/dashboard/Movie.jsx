import { useEffect, useState } from "react";
import { normalizeUrl } from "../../utils/urlHelper";
import { useNavigate, useParams } from "react-router-dom";
import MediaViewer from '../../components/MediaViewer';
import api from "../../api/api";
export const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [media, setMedia] = useState({
    url:"",
    type:"",
    title:""
  })
  const [openmedia, setOpenMedia] = useState(false)

  useEffect(() => {
    fetchMovieDetails();
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
    if (!movie) return;
    try {
      const response = await api.post("/favorites/toggle", {
        mediaId: movie._id,
        mediaType: "movie",
        title: movie.title,
        image: movie.image,
        genre: movie.genre,
        language: movie.language,
      });
      setIsFavorited(response.data.favorited);
      alert(response.data.message);
    } catch (err) {
      console.error("Error toggling favorite status:", err);
      alert(err.response?.data?.message || "Failed to update favorites.");
    }
  };

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl =
        import.meta.env.VITE_API_URL || "http://localhost:2025";

      const response = await fetch(
        `${baseUrl}/movieflix/movies`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      const selectedMovie = data.data.find(
        (movie) => movie._id === id
      );

      if (!selectedMovie) {
        throw new Error("Movie not found");
      }

      setMovie(selectedMovie);
    } catch (err) {
      console.error(err);
      setError("Unable to load movie details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  const bannerUrl = normalizeUrl(movie.banner);

  function CloseModel(){
    setOpenMedia(false)
  }
  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white">
      
      {/* Banner Section */}
      <div
        className="
          relative
          w-full
          h-[40vh]
          md:h-[55vh]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${bannerUrl})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/movies")}
          className="
            absolute
            top-5
            left-5
            z-20
            bg-black/60
            hover:bg-red-500
            transition
            px-4
            py-2
            rounded-lg
            text-white
            font-medium
          "
        >
          ← Back
        </button>

        {/* Movie Poster */}
        <div
          className="
            absolute
            bottom-[-80px]
            left-6
            md:left-10
            z-20
          "
        >
          <img
            src={normalizeUrl(movie.image)}
            alt={movie.title}
            className="
              w-[160px]
              md:w-[240px]
              h-[240px]
              md:h-[360px]
              object-cover
              rounded-2xl
              shadow-2xl
              border-4
              border-white/10
            "
          />
        </div>
      </div>

      {/* Movie Content */}
      <div
        className="
          pt-[100px]
          md:pt-[120px]
          px-6
          md:px-10
          pb-10
        "
      >
        <h1
          className="
            text-3xl
            md:text-5xl
            font-bold
            mb-4
          "
        >
          {movie.title}
        </h1>

        <div
          className="
            flex
            flex-wrap
            gap-4
            text-sm
            md:text-base
            text-gray-300
            mb-6
          "
        >
          <span>
            🎬 {movie.genre}
          </span>

          <span>
            🌐 {movie.language}
          </span>

          <span>
            📅 {movie.releaseYear}
          </span>
        </div>

        <p
          className="
            text-gray-300
            leading-8
            max-w-4xl
            text-base
            md:text-lg
          "
        >
          {movie.description}
        </p>

        {/* Watch and Favorite Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            className="
              bg-red-600
              hover:bg-red-700
              active:scale-95
              transition-all
              px-8
              py-3
              rounded-xl
              text-white
              font-semibold
              text-lg
              shadow-lg
              cursor-pointer
            "
            onClick={async () => {
              try {
                const response = await api.get("/subscription/status");
                if (response.data.subscribed) {
                  setMedia((prev) => ({
                    ...prev,
                    url: movie.videourl,
                    type: "video",
                    title: movie.title,
                  }));
                  setOpenMedia(true);
                } else {
                  alert("A premium subscription is required to watch this video. Redirecting to subscription plans.");
                  navigate("/dashboard/subscription");
                }
              } catch (err) {
                console.error("Subscription check error:", err);
                alert("Could not verify subscription. Please try again.");
              }
            }}
          >
            ▶ Watch Now
          </button>

          <button
            onClick={handleToggleFavorite}
            className={`
              px-8
              py-3
              rounded-xl
              font-semibold
              text-lg
              shadow-lg
              cursor-pointer
              transition-all
              active:scale-95
              border
              ${
                isFavorited
                  ? "bg-slate-750 text-red-500 border-red-500 hover:bg-slate-700"
                  : "bg-slate-800 text-white border-zinc-700 hover:bg-zinc-700"
              }
            `}
          >
            {isFavorited ? "♥ Favorited" : "♡ Add to Favorite"}
          </button>
        </div>
      </div>
      { openmedia && <MediaViewer media={media} onClose={CloseModel}/>}
    </div>
    
  );
};

// import { useEffect, useState } from "react";
// import { normalizeUrl } from "../../utils/urlHelper";
// import { useNavigate, useParams } from "react-router-dom";
// export const Movie = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMovieDetails();
//   }, [id]);

//   const fetchMovieDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const baseUrl = "http://localhost:2025";
//       const response = await fetch(`${baseUrl}/movieflix/movies`);

//       if (!response.ok) {
//         throw new Error("Failed to fetch movies");
//       }

//       const data = await response.json();

//       const selectedMovie = data.data.find(
//         (movie) => movie._id === id
//       );

//       if (!selectedMovie) {
//         throw new Error("Movie not found");
//       }

//       setMovie(selectedMovie);
//     } catch (err) {
//       console.error(err);
//       setError("Unable to load movie details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading movie...</div>;
//   if (error) return <div>{error}</div>;

//   // ✅ normalize banner URL (THIS IS IMPORTANT)
//   const bannerUrl = normalizeUrl(movie.banner);

//   return (
//     <div className="movie-details">
//       {/* Back button */}
//       <div className="back-to-movie">
//         <button onClick={() => navigate("/dashboard/movies")}>
//           ← Back
//         </button>
//       </div>

//       {/* Banner Header */}
//       <div
//         className="movie-header"
//         style={{
//           width: "100%",
//           height: "35vh",
//           background: `url(${bannerUrl}) center / cover no-repeat`
//         //   backgroundRepeat: "no-repeat",
//         //   backgroundSize: "cover",
//         //   backgroundPosition: "center",
//         //   boxShadow: "0 0 6px rgba(0,0,0,0.6)",
//         }}
//       >

//         <img src={normalizeUrl(movie.image)} alt=""  height={350}/>
//     </div>

//       {/* Movie Info */}
//       <div className="movie-info">
//         <h1>{movie.title}</h1>
//         <p>{movie.description}</p>

//         <p><strong>Genre:</strong> {movie.genre}</p>
//         <p><strong>Language:</strong> {movie.language}</p>
//         <p><strong>Release Year:</strong> {movie.releaseYear}</p>
//       </div>
//     </div>
//   );
// };

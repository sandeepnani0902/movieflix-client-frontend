import { useNavigate } from "react-router-dom";
import { normalizeUrl } from "../../utils/urlHelper";

const PosterCard = ({ movie=[], 
  isWebSeries=false
 }) => {
  const navigate = useNavigate();
  console.log(movie)
  const GetMovie = (movieId) => {
    navigate(`/dashboard/movies/${movieId}`);
  };
  const GetSeries = (Id) => {
    navigate(`/dashboard/web-series/${Id}`);
  };

  if(isWebSeries){
    return (
       <div className=" bg-zinc-900 rounded-xl overflow-hidden shadow-lg group">
      
      {/* Movie Banner */}
      <img
        src={normalizeUrl(movie.image)}
        alt={movie.title}
        className="w-full h-[320px] object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Content */}
      <div className="p-3">
        <h3 className="text-white text-lg font-semibold truncate">
          {movie.title}
        </h3>

        <p className="text-gray-400 text-sm mb-3">
          {movie.language} • {movie.genre}
        </p>

        <button
          onClick={() => GetSeries(movie._id)}
          className=" bg-red-900 hover:bg-red-600 transition px-4 py-2 rounded-lg text-white text-sm font-medium"
        >
          Watch Now
        </button>
      </div>
    </div>
    )
  }

  return (
    <div className=" bg-zinc-900 rounded-xl overflow-hidden shadow-lg group">
      
      {/* Movie Banner */}
      <img
        src={normalizeUrl(movie.image)}
        alt={movie.title}
        className="w-full h-[320px] object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Content */}
      <div className="p-3">
        <h3 className="text-white text-lg font-semibold truncate">
          {movie.title}
        </h3>

        <p className="text-gray-400 text-sm mb-3">
          {movie.language} • {movie.genre}
        </p>

        <button
          onClick={() => GetMovie(movie._id)}
          className=" bg-red-900 hover:bg-red-600 transition px-4 py-2 rounded-lg text-white text-sm font-medium"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default PosterCard;

// import { normalizeUrl } from "../../utils/urlHelper";
// import { Navigate, useNavigate } from "react-router-dom";
// const MovieCard = ({ movie }) => {
//   const navigate = useNavigate()
//   console.log(movie)
//   function GetMovie(movieId) {
//     // <Navigate to={`/dashboard/movies/${movieId}`} />
//     navigate(`/dashboard/movies/${movieId}`)
//   }
//   return (
//     <div className="movie-card">
//       {/* Poster */}
//       <img src={normalizeUrl(movie.banner)}
//         className="movie-img" alt={movie.title} />

//       {/* Bottom overlay (appears on hover) */}
//       <div className="movie-overlay">
//         <div className="play-add-container">
//           <div>
//             <button className="watch-btn" onClick={() => GetMovie(movie._id)}>
//               <img
//                 className="play-btn"
//                 src="/src/assets/icons/play-button.png"
//                 alt="play"
//               />
//               Watch Now
//             </button>
//           </div>

//           <div>
//             <img
//               className="add-btn"
//               src="/src/assets/icons/add-button.png"
//               alt="add"
//             />
//           </div>
//         </div>

//         <div className="movie-info">
//           <h4>{movie.title}</h4>
//           <p>
//             {/* {movie.year} • {movie.duration} • {movie.genres.join(" • ")} */}
//           </p>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default MovieCard;

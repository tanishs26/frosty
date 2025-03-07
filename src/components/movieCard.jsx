import React from "react";
import Hell from "../assets/react.svg";
const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/no-movie.png"
        }
        alt="No poster"
        srcset=""
      />
      <h3 className="text-white mt-[20px]">{title}</h3>
      <div className="content">
        <div className="rating">
          <img src="./star.svg"/>
          <p className="text-gray-400">
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </p>
        </div>
        <span>•</span>
        <p className="lang">{original_language}</p>
        <span>•</span>
        <p className="year">{release_date?release_date.split('-')[0]:'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieCard;

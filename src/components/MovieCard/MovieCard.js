import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components_css/components.css";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { Icon } from "semantic-ui-react";
import tmdbContext from "../../context/movie-context";

const MovieCard = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { stateMovie } = useContext(tmdbContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            />
            <div className="cards__overlay">
              <div className="card__title">{movie.original_title}</div>
              <div className="card__runtime">
                {movie.release_date}
                {/* {movie?movie.release_date:""} */}
                <div className="card__rating">
                  <span>{movie.vote_average}</span>
                  <span>
                    {" "}
                    <Icon name="star" />
                  </span>
                </div>
              </div>
              <div className="card__description">
                {movie.overview.slice(0, 118) + "..."}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default MovieCard;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbContext from "../context/movie-context";
import Youtube from "react-youtube";
import { Icon } from "semantic-ui-react";

const Movie = () => {
  const id = useParams();

  const { getMovie, cardDetails, trailer } = useContext(tmdbContext);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (id) {
      getMovie(id);
      console.log(id);
    }
  }, []);

  const handlerPlaying = () => {
    if (playing) return setPlaying(false);
    else {
      if (trailer == false) {
        console.log("Trailer not found!");
      } else {
        setPlaying(true);
      }
    }
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        {playing ? (
          <>
            <Youtube
              videoId={trailer.key}
              className={"movie__backdrop"}
              containerClassName={"youtube-container"}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  cc_load_policy: 0,
                  fs: 0,
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0,
                  showinfo: 0,
                },
              }}
            />
            <button
              onClick={() => setPlaying(false)}
              className={"close_trailer"}
            >
              Close Trailer{" "}
            </button>
          </>
        ) : (
          <img
            className="movie__backdrop"
            src={`https://image.tmdb.org/t/p/original${
              cardDetails ? cardDetails.backdrop_path : ""
            }`}
          />
        )}
      </div>
      <div className={playing ? "movie__detail display" : "movie__detail"}>
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                cardDetails ? cardDetails.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {cardDetails ? cardDetails.original_title : ""}
            </div>
            <div className="movie__tagline">
              {cardDetails ? cardDetails.tagline : ""}
            </div>
            <div className="movie__rating">
              {cardDetails ? cardDetails.vote_average : ""} <Icon name="star" />
              <span className="movie__voteCount">
                {cardDetails ? "(" + cardDetails.vote_count + ") votes" : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {cardDetails ? cardDetails.runtime + " min" : ""}
            </div>
            <div className="movie__releaseDate">
              {cardDetails ? "Release date: " + cardDetails.release_date : ""}
            </div>
            <div className="movie__genres">
              {cardDetails && cardDetails.genres
                ? cardDetails.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
              {trailer == false ? (
                <span className="movie__genre">
                  Thriller is currently unavailable
                </span>
              ) : (
                <>
                  {playing ? (
                    <span
                      className="play__trailer"
                      onClick={() => handlerPlaying()}
                    >
                      Censel Trailer
                    </span>
                  ) : (
                    <span
                      className="play__trailer"
                      onClick={() => handlerPlaying()}
                    >
                      Play Trailer
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{cardDetails ? cardDetails.overview : ""}</div>
          </div>
        </div>
      </div>
      <h3 className={playing ? "playing" : "movie__heading"}>
        PRODUCTION COMPANIES
      </h3>
      <div className={playing ? "playing" : "movie__production"}>
        {cardDetails &&
          cardDetails.production_companies &&
          cardDetails.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Movie;

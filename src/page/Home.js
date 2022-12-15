import React, { useContext } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import ShowCard from "../components/ShowCard/ShowCard";
import tmdbContext from "../context/movie-context";
import "./page_css/Page.css";

const Home = () => {
  const { stateMovie } = useContext(tmdbContext);

  return (
    <div className="movie__list">
      <div className="app__name">
        <h2>POPULAR MOVIES AND TV SHOWS</h2>
      </div>
      <div className="list__cards">
        {stateMovie.post.length > 0 ?
          stateMovie.post.map((movie) => {
            if (movie.original_title) {
              return <MovieCard key={movie.id} movie={movie} />;
            } else if (!movie.original_title) {
              return <ShowCard key={movie.id} show={movie} />;
            }
          }) : 
          <h2>Incorrect data</h2>}
      </div>
    </div>
  );
};

export default Home;

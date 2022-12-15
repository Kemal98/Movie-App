import React, { useEffect, useReducer, useState } from "react";
import MovieContext from "./movie-context";
import axios from "axios";
import { INITIAL_STATE_MOVIE, movieReducer } from "./reducer/movie-reducer";
import { ACTION_TYPES } from "./reducer/action-reducer";

const ContexState = (props) => {
  const api_key = "18263e62708d64155afdf4278e5b86ec";
  
    const [stateMovie, dispatchMovie] = useReducer(
      movieReducer,
      INITIAL_STATE_MOVIE
    );

  const [cardDetails, setCard] = useState({});

  const [trailer, setTrailer] = useState(null);

  const getAll = async (name) => {
    dispatchMovie({
      type: ACTION_TYPES.FETCH_START,
    });
  try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${name}/top_rated?api_key=${api_key}&language=en-US&page=1`
      );

      dispatchMovie({
        type: ACTION_TYPES.FETCH_SUCCESS,
        payload: res.data.results.slice(0, 10),
      });

    } catch (error) {
      dispatchMovie({
        type: ACTION_TYPES.FETCH_ERROR,
        payload: error,
      });
    }
  };

  const getTvShow = async (id) => {
    console.log(id)
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id.id}?api_key=${api_key}&language=en-US&append_to_response=videos`
      );
      console.log(res.data)
      setCard(res.data);
      if (res.data.videos && res.data.videos.results) {
        const trailer = res.data.videos.results.find(
          (vid) => vid.type === "Trailer"  || vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : false);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const getMovie = async (id) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id.id}?api_key=${api_key}&language=en-US&append_to_response=videos`
      );
      setCard(res.data);
      if (res.data.videos && res.data.videos.results) {
        const trailer = res.data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = async (name) => {
    dispatchMovie({
      type: ACTION_TYPES.FETCH_START,
    });
    try {
      const concurrentRequests = [
        await axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${name}`
        ),
        await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${name}`
        ),
      ];
      Promise.all(concurrentRequests).then((responses) => {
        let data = [];
        responses.forEach((response) => {
          data = data.concat(response.data.results);
        });
        dispatchMovie({
          type: ACTION_TYPES.FETCH_SUCCESS,
          payload: data.slice(0, 10),
        });
      });
    } catch (error) {
      dispatchMovie({
        type: ACTION_TYPES.FETCH_ERROR,
        payload: error,
      });
    }
  };


  return (
    <MovieContext.Provider
      value={{
        getAll,
        getTvShow,
        cardDetails,
        trailer,
        getMovie,
        getSearch,
        stateMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default ContexState;

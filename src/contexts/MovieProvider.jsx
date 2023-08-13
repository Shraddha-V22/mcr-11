import React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { movieReducer } from "../reducers/movieReducer";
import { movies } from "../data/moviesData";
import { useContext } from "react";
import { useMemo } from "react";
import { MOVIE } from "../utils/reducerTypes";
import { useEffect } from "react";

const MovieContext = createContext(null);

const initialData = {
  movies: [...movies],
  genre: "all",
  year: "all",
  rating: "all",
  searchText: "",
  starred: [],
  watchlist: [],
};

export default function MovieProvider({ children }) {
  const [movieData, dispatch] = useReducer(movieReducer, initialData);

  const filteredMovies = useMemo(() => {
    let searchedData = movieData.searchText
      ? movieData.movies.filter(
          ({ title, cast, director }) =>
            title.toLowerCase().includes(movieData.searchText.toLowerCase()) ||
            cast
              .join(",")
              .toLowerCase()
              .includes(movieData.searchText.toLowerCase()) ||
            director.toLowerCase().includes(movieData.searchText.toLowerCase())
        )
      : movieData.movies;

    let newMovies =
      movieData.genre !== "all"
        ? searchedData.filter(({ genre }) => genre.includes(movieData.genre))
        : searchedData;
    newMovies =
      movieData.year !== "all"
        ? newMovies.filter(({ year }) => year == movieData.year)
        : newMovies;
    newMovies =
      movieData.rating !== "all"
        ? newMovies.filter(({ rating }) => rating == movieData.rating)
        : newMovies;
    return newMovies;
  }, [movieData]);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("movieData"));
    if (existingData) {
      dispatch({
        type: MOVIE.SET_MOVIES,
        payload: existingData,
      });
    } else {
      dispatch({
        type: MOVIE.SET_MOVIES,
        payload: {
          movies: movieData.movies,
          starred: movieData.starred,
          watchlist: movieData.watchlist,
        },
      });
    }
  }, []);

  return (
    <MovieContext.Provider value={{ movieData, dispatch, filteredMovies }}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);

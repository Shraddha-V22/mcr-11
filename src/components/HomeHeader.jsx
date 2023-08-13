import React from "react";
import { getAllYearList, getMinMaxYear } from "../utils/getMinMaxYear";
import { useMovies } from "../contexts/movieProvider";
import { MOVIE } from "../utils/reducerTypes";
import { useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate();
  const {
    movieData: { movies, genre, year, rating },
    dispatch,
  } = useMovies();

  const genres = movies?.reduce((acc, { genre }) => {
    for (let i = 0; i < genre.length; i++) {
      return acc.includes(genre[i]) ? acc : [...acc, genre[i]];
    }
  }, []);

  const movieRating = movies
    ?.reduce((acc, { rating }) => {
      return acc.includes(rating) ? acc : [...acc, rating];
    }, [])
    .sort((a, b) => a - b);

  const getYearList = (movies) => {
    let minMaxYear = getMinMaxYear(movies);
    let yearArr = [];
    for (let i = minMaxYear[0]; i <= minMaxYear[1]; i++) {
      yearArr.push(i);
    }
    return yearArr;
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: MOVIE.FILTER, payload: { name, value } });
  };

  return (
    <section className="flex items-center justify-between px-8 py-2">
      <h1 className="text-xl font-semibold">Movies</h1>
      <div>
        <select
          className="rounded-md border p-2 outline-none"
          name="genre"
          id="genre"
          onChange={inputChangeHandler}
          value={genre}
        >
          <option value="all">all genres</option>
          {genres?.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="rounded-md border p-2"
          outline-none
          name="year"
          id="year"
          value={year}
          onChange={inputChangeHandler}
        >
          <option value="all">release year</option>
          {getYearList(movies)?.map((year) => (
            <option
              disabled={!getAllYearList(movies)?.includes(year)}
              key={year}
              value={year}
              className=""
            >
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="rounded-md border p-2"
          outline-none
          name="rating"
          id="rating"
          value={rating}
          onChange={inputChangeHandler}
        >
          <option value="all">all rating</option>
          {movieRating?.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>
      <button
        className="rounded-md border bg-gray-500 px-2 py-2 text-white active:bg-gray-600"
        onClick={() => navigate("/add-new-movie")}
      >
        Add a movie
      </button>
    </section>
  );
}

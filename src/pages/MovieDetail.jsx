import React from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../contexts/movieProvider";
import { MOVIE } from "../utils/reducerTypes";

export default function MovieDetail() {
  const { movieId } = useParams();
  const {
    filteredMovies,
    dispatch,
    movieData: { starred, watchlist },
  } = useMovies();

  const movie = filteredMovies?.find(({ id }) => id == movieId);

  if (movie) {
    const {
      id,
      title,
      year,
      genre,
      rating,
      director,
      writer,
      cast,
      summary,
      imageURL,
    } = movie;

    return (
      <section className="m-8 grid grid-cols-[300px_1fr] gap-4 rounded-lg bg-gray-200 px-8 py-4 text-sm capitalize shadow-md">
        <img src={imageURL} alt={title} className="rounded-lg" />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p>{summary}</p>
          <p>year: {year}</p>
          <p>genre: {genre}</p>
          <p>rating: {rating}/10</p>
          <p>director: {director}</p>
          <p>writer: {writer}</p>
          <p>cast: {cast}</p>
          <div className="flex w-full items-center justify-between gap-2 text-sm">
            <button
              onClick={() => {
                dispatch({ type: MOVIE.ADD_TO_STARRED, payload: id });
              }}
              className="rounded-md border bg-gray-500 p-2 text-white active:bg-gray-600"
            >
              {starred.includes(id) ? "Starred" : "Star"}
            </button>
            <button
              onClick={() => {
                dispatch({ type: MOVIE.ADD_TO_WATCHLIST, payload: id });
              }}
              className="rounded-md border bg-gray-500 p-2 text-white active:bg-gray-600"
            >
              {watchlist.includes(id)
                ? "Added to Watchlist"
                : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </section>
    );
  }
}

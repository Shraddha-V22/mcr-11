import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../contexts/movieProvider";
import { MOVIE } from "../utils/reducerTypes";

export default function MovieCard({ movie }) {
  const {
    dispatch,
    movieData: { starred, watchlist },
  } = useMovies();
  const navigate = useNavigate();
  const { id, title, summary, imageURL } = movie;

  return (
    <div
      title={title}
      onClick={() => navigate(`/movie/${id}`)}
      className="w-[200px] overflow-hidden rounded-md shadow-md hover:cursor-pointer"
    >
      <img
        src={imageURL}
        alt=""
        className="h-[250px] w-full border object-cover"
      />
      <div className="flex flex-col gap-2 p-2">
        <h1 className="line-clamp-1 text-lg font-semibold">{title}</h1>
        <p className="line-clamp-3 text-xs">{summary}</p>
        <div className="flex w-full items-center justify-between gap-2 text-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: MOVIE.ADD_TO_STARRED, payload: id });
            }}
            className="rounded-md border bg-gray-500 p-2 text-xs text-white active:bg-gray-600"
          >
            {starred.includes(id) ? "Starred" : "Star"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: MOVIE.ADD_TO_WATCHLIST, payload: id });
            }}
            className="rounded-md border bg-gray-500 p-2 text-xs text-white active:bg-gray-600"
          >
            {watchlist.includes(id) ? "Added to Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

// {
//   id: 1,
//   title: "Redemption",
//   year: 1994,
//   genre: ["Drama"],
//   rating: 9,
//   director: "Frank Darabont",
//   writer: "Stephen King",
//   cast: ["Tim Robbins", "Morgan Freeman"],
//   summary:
//     "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
//   imageURL:
//     "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
// },

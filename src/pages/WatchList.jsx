import React from "react";
import { useMovies } from "../contexts/movieProvider";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

export default function WatchList() {
  const navigate = useNavigate();
  const {
    movieData: { watchlist, movies },
  } = useMovies();

  const watchlistMovies = movies?.filter(({ id }) =>
    watchlist.find((el) => id == el)
  );

  return (
    <section className="flex flex-col gap-4 p-8">
      <h1 className="text-xl font-semibold">Watch List</h1>
      {watchlistMovies.length > 0 ? (
        <div className="flex flex-col gap-4 ">
          {watchlistMovies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2">
          <p>No Watchlist</p>
          <button
            className="rounded-md border bg-gray-500 p-2 text-white active:bg-gray-600"
            onClick={() => navigate("/")}
          >
            Add Movies to Watchlist
          </button>
        </div>
      )}
    </section>
  );
}

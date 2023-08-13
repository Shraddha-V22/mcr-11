import React from "react";
import { useMovies } from "../contexts/movieProvider";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

export default function Starred() {
  const navigate = useNavigate();
  const {
    movieData: { starred, movies },
  } = useMovies();

  const starredMovies = movies?.filter(({ id }) =>
    starred.find((el) => id == el)
  );

  return (
    <section className="flex flex-col gap-4 p-8">
      <h1 className="text-xl font-semibold">Starred Movies</h1>
      {starredMovies.length > 0 ? (
        starredMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <div className="flex flex-col items-start gap-2">
          <p>No Starred Movies</p>
          <button
            className="rounded-md border bg-gray-500 p-2 text-white active:bg-gray-600"
            onClick={() => navigate("/")}
          >
            Add Movies to Starred
          </button>
        </div>
      )}
    </section>
  );
}

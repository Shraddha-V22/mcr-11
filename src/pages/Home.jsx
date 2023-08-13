import React from "react";
import HomeHeader from "../components/HomeHeader";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../contexts/movieProvider";

export default function Home() {
  const { filteredMovies } = useMovies();

  return (
    <article className="mt-4">
      <HomeHeader />
      <section className="flex flex-wrap justify-center gap-6 px-8 py-4">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </article>
  );
}

import React from "react";
import { useMovies } from "../contexts/movieProvider";
import { MOVIE } from "../utils/reducerTypes";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    dispatch,
    movieData: { searchText },
  } = useMovies();

  return (
    <div className="flex items-center justify-between border-b bg-gray-700 px-4 py-2 text-gray-50">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-semibold hover:cursor-pointer"
      >
        IMDB
      </h1>
      <input
        type="text"
        value={searchText}
        placeholder="Search by movie title, cast or director"
        className="rounded-md border p-2 text-black outline-none"
        onChange={(e) => {
          dispatch({ type: MOVIE.SEARCH, payload: e.target.value });
          location.pathname !== "/" && navigate("/");
        }}
      />
      <nav className="flex gap-4">
        <NavLink to="/">Movies</NavLink>
        <NavLink to="/starred">Starred Movies</NavLink>
        <NavLink to="/watchlist">Watch List</NavLink>
      </nav>
    </div>
  );
}

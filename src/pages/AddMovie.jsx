import React from "react";
import { useState } from "react";
import { useMovies } from "../contexts/movieProvider";
import { MOVIE } from "../utils/reducerTypes";
import { useNavigate } from "react-router-dom";
import { objHasAllValues } from "../utils/objHasAllTheValues";
import { urlValidator } from "../utils/urlValidator";
import toast from "react-hot-toast";

export default function AddMovie() {
  const { dispatch } = useMovies();
  const navigate = useNavigate();
  const [movieInputs, setMovieInputs] = useState({
    title: "",
    summary: "",
    year: 0,
    cast: "",
    genre: "",
    rating: 0,
    director: "",
    writer: "",
    imageURL: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setMovieInputs((prev) => ({ ...prev, [name]: value }));
  };

  const addNewMovie = (e) => {
    e.preventDefault();
    if (!objHasAllValues(movieInputs)) {
      toast.error("Please fill all the details!");
      return;
    }
    if (!urlValidator(movieInputs.imageURL)) {
      toast.error("Please provide a valid image url!");
      return;
    }
    dispatch({ type: MOVIE.ADD_MOVIE, payload: movieInputs });
    toast.success(`"${movieInputs.title}" added successfully!`);
    navigate("/");
  };

  return (
    <section className="flex max-w-[400px] flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold">Add a movie</h1>
      <form className="flex flex-col gap-4">
        <InputComponent
          onChange={inputChangeHandler}
          name="title"
          title="Title"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="summary"
          title="Summary"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="year"
          title="Year"
          type="number"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="cast"
          title="Cast"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="genre"
          title="Genre"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="rating"
          title="Rating"
          type="number"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="director"
          title="Director"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="writer"
          title="Writer"
        />
        <InputComponent
          onChange={inputChangeHandler}
          name="imageURL"
          title="Image URL"
        />
        <button
          className="rounded-md border bg-gray-500 p-2 text-white active:bg-gray-600"
          onClick={addNewMovie}
        >
          Add Movie
        </button>
      </form>
    </section>
  );
}

function InputComponent({ name, title, onChange, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm" htmlFor={name}>
        {title}:
      </label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        className="rounded-md border border-gray-400 p-2 indent-1 outline-none"
      />
    </div>
  );
}

import { MOVIE } from "../utils/reducerTypes";

export const movieReducer = (state, { type, payload }) => {
  switch (type) {
    case MOVIE.SET_MOVIES:
      state = {
        ...state,
        ...payload,
      };
      break;
    case MOVIE.FILTER:
      state = {
        ...state,
        [payload.name]: payload.value,
      };
      break;
    case MOVIE.ADD_MOVIE:
      state = {
        ...state,
        movies: [{ id: Math.random(), ...payload }, ...state.movies],
      };
      break;
    case MOVIE.ADD_TO_STARRED:
      state = {
        ...state,
        starred: state.starred.includes(payload)
          ? state.starred.filter((el) => el !== payload)
          : [payload, ...state.starred],
      };
      break;
    case MOVIE.ADD_TO_WATCHLIST:
      state = {
        ...state,
        watchlist: state.watchlist.includes(payload)
          ? state.watchlist.filter((el) => el !== payload)
          : [payload, ...state.watchlist],
      };
      break;
    case MOVIE.SEARCH:
      state = {
        ...state,
        searchText: payload,
      };
      break;
    default:
      break;
  }

  localStorage.setItem(
    "movieData",
    JSON.stringify({
      movies: state.movies,
      starred: state.starred,
      watchlist: state.watchlist,
    })
  );

  return state;
};

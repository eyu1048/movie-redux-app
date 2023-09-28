import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from "react-redux";

const URL = "http://www.omdbapi.com?apikey=5dbdbe85";
const Default_search = "spiderman";
// const dispatch = useDispatch();

// create a thunk action that fetches movies from the API
export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (searchTerm) => {
    const response = await axios(`${URL}&s=${searchTerm}`);
    // dispatch(setLoading(false));
    return response.data.Search;
  }
);

const getFavoriteLocalStorage = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

const initialStateValue = {
  movies: [],
  favoriteMovies: getFavoriteLocalStorage(),
  searchTerm: Default_search,
  loading: false,
  status: "idle", // loading status of the async action
  error: null, //
};

export const movieSlice = createSlice({
  name: "movie",
  initialState: initialStateValue,
  reducers: {
    searchMovies: (state, action) => {
      state.searchTerm = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addFavorites: (state, action) => {
      const newMovies = action.payload;
      state.favoriteMovies.push(newMovies);
      localStorage.setItem("favorites", JSON.stringify(state.favoriteMovies));
      // state.favoriteMovies = [...state.favoriteMovies, ...newMovies];
    },
    removeFavorites: (state, action) => {
      const movieId = action.payload;
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.imdbID !== movieId
      );
      localStorage.setItem("favorites", JSON.stringify(state.favoriteMovies));
    },
  },
  extraReducers: {
    // add reducers for the async action
    [fetchMovies.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.movies = action.payload;
    },
    [fetchMovies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { searchMovies, setLoading, addFavorites, removeFavorites } =
  movieSlice.actions;

export default movieSlice.reducer;

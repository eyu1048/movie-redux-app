import React, { useEffect } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import { setLoading } from "../features/movie";

import { fetchMovies } from "../features/movie";
import { useNavigate } from "react-router-dom";
import { addFavorites, removeFavorites } from "../features/movie";
// const Default_search = "spiderman";

const Home = () => {
  const favorites = useSelector((state) => state.movie.favoriteMovies);
  const movies = useSelector((state) => state.movie.movies);
  const searchTerm = useSelector((state) => state.movie.searchTerm);
  const loading = useSelector((state) => state.movie.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkFavorite = (id) => {
    console.log(favorites); // Check the favorites array
    console.log(id);
    const boolean = favorites.some((m) => m.imdbID === id);
    return boolean;
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchMovies(searchTerm))
      .unwrap()
      .then(() => {
        dispatch(setLoading(false));
      });
  }, [searchTerm]);

  if (loading) {
    return (
      <section className="empty">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <>
      <div className="movie-container">
        {movies.map((movie) => {
          const { imdbID: id, Year, Poster, Title, Type } = movie;
          return (
            <div className="movie" key={id}>
              <div>
                <p>{Year}</p>
              </div>
              <div>
                <img
                  src={
                    Poster !== "N/A"
                      ? Poster
                      : "https://via.placeholder.com/400"
                  }
                  alt={Title}
                  onClick={() => navigate(`/movie/${id}`)}
                />
              </div>
              <div>
                <span className="babi-movie">{Type}</span>
                <h3>{Title}</h3>
                <div className="movie-flex">
                  {checkFavorite(id) ? (
                    <button
                      className="like-btn"
                      onClick={() => dispatch(removeFavorites(id))}
                    >
                      <BsHandThumbsDown size={20} color="white" />
                    </button>
                  ) : (
                    <button
                      className="like-btn"
                      onClick={() => dispatch(addFavorites(movie))}
                    >
                      <BsHandThumbsUp size={20} color="white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;

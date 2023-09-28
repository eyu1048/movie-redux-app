import React from "react";
import "./movieItem.css";
import { useSelector, useDispatch } from "react-redux";
import { BsHandThumbsDown } from "react-icons/bs";
import { removeFavorites } from "../features/movie";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state) => state.movie.favoriteMovies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className="favorites-container">
      {favorites.length > 0 ? (
        <div className="movie-container">
          {favorites.map((movie) => {
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
                  />
                  onClick={() => navigate(`/movie/${id}`)}
                </div>

                <div>
                  <span className="babi-movie">{Type}</span>
                  <h3>{Title}</h3>
                  <div className="movie-flex">
                    <button
                      className="like-btn"
                      // onClick={() => removeFavorite(id)}
                    >
                      <BsHandThumbsDown
                        size={20}
                        color="white"
                        onClick={() => dispatch(removeFavorites(id))}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No Favorites found</h2>
        </div>
      )}
    </section>
  );
};

export default Favorites;

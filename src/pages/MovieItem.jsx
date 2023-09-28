import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./movieItem.css";

const URL = "http://www.omdbapi.com/?apikey=5dbdbe85";

const MovieItem = () => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${URL}&i=${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <section className="movie-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="movie-details-content grid">
          <div className="movie-details-img">
            <img
              src={
                movie?.Poster !== "N/A"
                  ? movie?.Poster
                  : "https://via.placeholder.com/400"
              }
              alt="cover img"
            />
          </div>
          <div
            className="movie-details-info"
            style={{ fontFamily: "Dancing Script", fontWeight: 700 }}
          >
            <div className="movie-details-item title">
              <span className="fw-6">Movie Title: </span>
              <span className="fw-6 fs-24">{movie?.Title}</span>
            </div>

            <div className="movie-details-item">
              <span className="fw-6">Published Year: </span>
              <span className="text-italic">{movie?.Year}</span>
            </div>
            <div className="movie-details-item">
              <span className="fw-6">Movie Type: </span>
              <span className="text-italic">{movie?.Type}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieItem;

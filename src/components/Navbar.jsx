import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link
        to="/"
        className="link navbar-brand"
        style={{ fontFamily: "Dancing Script", fontWeight: 700 }}
      >
        BabiChuloMovies
      </Link>
      <Link to="/favorite" className="link navbar-favorites">
        My Favorites
      </Link>
    </div>
  );
};

export default Navbar;

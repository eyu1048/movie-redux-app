import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import "./search.css";
import { useDispatch } from "react-redux";
import { searchMovies } from "../features/movie";

const Search = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(searchMovies(text));
    }
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="search for movies"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handlePress}
      />
      <RiSearchLine onClick={handleSubmit} />
    </div>
  );
};

export default Search;

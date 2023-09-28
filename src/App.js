import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import MovieItem from "./pages/MovieItem";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <h1>BabiChulo Movie</h1>
              <Search />
              <Home />
            </div>
          }
        />
        <Route path="/movie/:id" element={<MovieItem />} />
        <Route path="/favorite" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;

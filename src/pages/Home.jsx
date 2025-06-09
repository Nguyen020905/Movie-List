import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react"; //for running side effects (like data fetching, dùng khi mà mởi mở lên để đỡ phải tốn data).

import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]); // useState return an array with both the current value of the movie = movie and the function to update that state = setMovie
  // "Declare a constant function called handleSearch, which takes no arguments and will contain logic inside the curly braces {} to be executed when triggered
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []); //It runs only once — when the function () first render , it will only run again if the depent [] change

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; //stop the user to search space
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery} // binds the input box to the state.
          onChange={(e) => setSearchQuery(e.target.value)} //keeps the state updated when the user types.
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

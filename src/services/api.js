const API_KEY = "b2b9b3890f1f1419e8c0a37cb7aa456f"; //API key used to authenticate your request with the TMDB API
const BASE_URL = "https://api.themoviedb.org/3"; //base URL for TMDB's version 3 API.

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

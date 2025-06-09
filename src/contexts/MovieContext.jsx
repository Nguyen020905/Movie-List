import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  //Provide state to any of the component that wrapp around it
  const [favorites, setFavorite] = useState([]);
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites"); //local storage is store on the web page , check by string

    if (storedFavs) setFavorite(JSON.parse(storedFavs)); //if it exist convert it into a JSON string then pass it into the setFavorite function
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); //Converts the array into a string before storing it and it only run when favorites is change
  }, [favorites]);
  const addToFavorites = (movie) => {
    setFavorite((prev) => [...prev, movie]); //addToFavorites adds a new movie to the end of the current favorites list without modifying the original array.
  };
  const removeFromFavorites = (movieId) => {
    setFavorite((prev) => prev.filter((movie) => movie.id !== movieId)); //create a new array of list of movie that doesnt include the one we remove
  };
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

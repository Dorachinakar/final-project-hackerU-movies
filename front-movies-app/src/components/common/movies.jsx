import React, { useState, useEffect } from "react";
import AddFavourites from "./AddFavourites";
import MovieList from "../pages/movielist";
import MovieListHeading from "./movieHeading";
import Search from "./search";
import RemoveFavourites from "./RemoveFavourites";
import "../../App.css";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=aea06659`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);

    setFavourites(newFavouriteList);
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className="movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Movies" />
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            favouriteComponent={AddFavourites}
            handleFavouritesClick={addFavouriteMovie}
          />
        </div>
        <div className="row ">
          <MovieListHeading heading="Favourites" />
        </div>
        <div className="row">
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
          />
        </div>
      </div>
    </>
  );
};

export default Movies;

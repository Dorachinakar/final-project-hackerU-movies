import { getAllFavorite } from "../../service/favServics";
import { useState, useEffect } from "react";
import PageHeader from "../common/pageHeader";
import FavoriteChiled from "./favoritechild";
function Favorite() {
  const [favorite, setFavorite] = useState([]);
  const [movies, setMovies] = useState([]);
  console.log(movies);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getAll() {
      const { data } = await getAllFavorite();
      setFavorite(data);

      const fmovies = [];
      for (let i = 0; i < data.length; i++) {
        const url = `http://www.omdbapi.com/?s=${data[i]}&apikey=aea06659`;
        const response = await fetch(url);
        const responseJson = await response.json();
        const obj = responseJson.Search;

        if (obj) fmovies.push(obj[0]);
      }
      setMovies(fmovies);
    }

    getAll();
  }, []);

  return (
    <>
      <PageHeader title="favorite" description="here is all of your favorite movie" />

      <div className="row">
        {movies.map((movie) => (
          <FavoriteChiled key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Favorite;

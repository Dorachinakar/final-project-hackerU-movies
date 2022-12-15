function FavoriteChiled({ movie }) {
  console.log(movie);
  return (
    <>
      {
        <div key={movie.imdbID} className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
        </div>
      }
    </>
  );
}

export default FavoriteChiled;

function FavoriteChiled({ movie, removeFav }) {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
      {
        <div key={movie.imdbID} className="image-container d-flex m-3">
          <img src={movie.Poster} alt="movie"></img>

          <button
            className="delete-favorite"
            onClick={() => {
              removeFav(movie.Title);
              refreshPage();
            }}
          >
            delete from favorite
          </button>
        </div>
      }
    </>
  );
}

export default FavoriteChiled;

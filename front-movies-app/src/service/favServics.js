import httpService from "./httpService";

export function favToDB(movie) {
  return httpService.post("/user/favorite", movie);
}
export function getAllFavorite(userId) {
  return httpService.get("/user/getallfavorite", userId);
}
export function delFromFav(favorite) {
  return httpService.patch(`/user/delete`, favorite);
}
const favService = {
  favToDB,
  getAllFavorite,
  delFromFav,
};

export default favService;

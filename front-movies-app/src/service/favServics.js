import httpService from "./httpService";

export function favToDB(movie) {
  return httpService.post("/user/favorite", movie);
}
export function getAllFavorite(userId) {
  return httpService.get("/user/getallfavorite", userId);
}

const favService = {
  favToDB,
  getAllFavorite,
};

export default favService;

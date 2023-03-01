import httpService from "./httpService";

export function createNote(note) {
  return httpService.post("/notes", note);
}

export function getAll() {
  return httpService.get("/notes/my-notes");
}

export function deleteNote(id) {
  return httpService.delete(`/notes/delete/${id}`);
}

const noteService = {
  createNote,
  getAll,
  deleteNote,
};

export default noteService;

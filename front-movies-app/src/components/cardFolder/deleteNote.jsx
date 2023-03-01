import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notesService from "../../service/noteService";

const DeleteNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function deleteNote() {
      await notesService.deleteNote(id);
      navigate("/my-notes");
    }

    deleteNote();
  });

  return null;
};

export default DeleteNote;

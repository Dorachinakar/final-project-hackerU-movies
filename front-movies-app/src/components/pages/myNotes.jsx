import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import notesService from "../../service/noteService";
import Note from "../cardFolder/note";
import PageHeader from "../common/pageHeader";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const { data } = await notesService.getAll();

      setNotes(data);
    }

    getNotes();
  }, []);

  return (
    <>
      <PageHeader title="My Notes" description="your Notes are in the list below" />

      <div className="row">
        <Link to="create-note">Create a New Note</Link>
      </div>

      <div className="row">
        {!notes.length ? (
          <p>No Note yet</p>
        ) : (
          notes.map((note) => <Note key={note._id} note={note} />)
        )}
      </div>
    </>
  );
};

export default MyNotes;

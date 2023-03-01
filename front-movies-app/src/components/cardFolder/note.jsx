import { Link } from "react-router-dom";

const Note = ({ note: { _id, noteName, noteDescription } }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{noteName}</h5>
        <p className="card-text">{noteDescription}</p>

        <Link to={`/my-notes/delete/${_id}`} className="card-link">
          delete
        </Link>
      </div>
    </div>
  );
};

export default Note;

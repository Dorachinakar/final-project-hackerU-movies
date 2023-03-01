import Joi from "joi";
import PageHeader from "../common/pageHeader";
import Input from "../common/input";
import { useFormik } from "formik";
import FormikValidate from "../utils/FormikValidate";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createNote } from "../../service/noteService";

const CreateNote = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      noteName: "",
      noteDescription: "",
    },
    validate: FormikValidate({
      noteName: Joi.string().min(2).max(255).required().label("Name"),
      noteDescription: Joi.string().min(2).max(1024).required().label("Description"),
    }),
    async onSubmit(values) {
      try {
        await createNote(values);

        navigate("/my-notes");
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title="Create Note" description="Create Note" />

      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="text"
          label="Name"
          {...form.getFieldProps("noteName")}
          error={form.touched.noteName && form.errors.noteName}
        />
        <Input
          type="text"
          label="Description"
          {...form.getFieldProps("noteDescription")}
          error={form.touched.noteDescription && form.errors.noteDescription}
        />

        <div className="my-2">
          <button disabled={!form.isValid} className="btn btn-primary">
            Create Note
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNote;

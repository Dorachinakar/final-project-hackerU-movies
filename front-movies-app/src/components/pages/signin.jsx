import { useFormik } from "formik";
import { useState } from "react";
import PageHeader from "../common/pageHeader";
import Input from "../common/input";
import joi from "joi";
import FormikValidate from "../utils/FormikValidate";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function SignIn({ redirect }) {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: FormikValidate({
      email: joi
        .string()
        .min(6)
        .max(225)
        .required()
        .email({ tlds: { allow: false } }),
      password: joi.string().min(6).max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        await login({ ...values });

        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <PageHeader title={"sign in to the best movie site ever"} />
      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="email"
          label="email"
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        />
        <Input
          type="password"
          label="password"
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        />
        <div className="button-place">
          <button type="submit" disabled={!form.isValid} className="btn btn-primary">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}

export default SignIn;

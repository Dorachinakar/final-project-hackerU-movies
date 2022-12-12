import { useState } from "react";
import { useFormik } from "formik";
import joi from "joi";
import FormikValidate from "../utils/FormikValidate";
import PageHeader from "../common/pageHeader";
import Input from "../common/input";
import { userSignUp } from "../../service/userService";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function SignUp({ redirect }) {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
    },
    validate: FormikValidate({
      firstName: joi.string().min(2).max(30).required(),
      lastName: joi.string().min(2).max(30).required(),
      phone: joi.string().min(10).max(10),
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: false } }),
      password: joi.string().required(),
    }),
    async onSubmit(values) {
      try {
        await userSignUp({ ...values });
        await login({ email: values.email, password: values.password });
        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data.details[0].message);
        }
      }
    },
  });
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader title={"sign up to the best movie site ever"} />
      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          type="firstName"
          label="firstName"
          {...form.getFieldProps("firstName")}
          error={form.touched.firstName && form.errors.firstName}
        />
        <Input
          error={form.touched.lastName && form.errors.lastName}
          type="lastName"
          label="lastName"
          {...form.getFieldProps("lastName")}
        />
        <Input
          type="phone"
          label="phone"
          {...form.getFieldProps("phone")}
          error={form.touched.phone && form.errors.phone}
        />
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
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;

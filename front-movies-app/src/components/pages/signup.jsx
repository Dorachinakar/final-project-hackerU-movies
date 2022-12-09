import { useState } from "react";
import { useFormik } from "formik";
import joi from "joi";
import FormikValidate from "../utils/FormikValidate";
import PageHeader from "../common/pageHeader";
import Input from "../common/input";
function SignUp({ redirect }) {
  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: FormikValidate({
      firstName: joi.string().min(2).max(30).required(),
      lastName: joi.string().min(2).max(30).required(),
      phone: joi.string().min(10).max(10),
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: false } }),
      password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      name: joi.string().required(),
    }),
  });
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
          type="lastName"
          label="lastName"
          {...form.getFieldProps("lastName")}
          error={form.touched.lastName && form.errors.lastName}
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
          <button disabled={!form.isValid} className="btn btn-primary">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
// function SignUp({ redirect }) {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [error, setError] = useState("");
//
//     async onSubmit(values) {
//       try {
//         await createUser({ ...values, cards: [], isVip: false });
//         if (redirect) {
//           navigate(redirect);
//         }
//       } catch ({ response }) {
//         if (response.status === 400) {
//           setError(response.data);
//         }
//       }
//     },
//   });
//   if (user) {
//     return <Navigate to="/" />;
//   }
//

// import { useFormik } from "formik";
// import joi from "joi";
// import { useState } from "react";
// import Input from "./common/input";
// import PageHeader from "./common/pageHeader";
// import FormikValidateJoi from "../utils/formikUsingJoi";
// import { createUser } from "../service/userService";
// import { useNavigate, Navigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// import { useAuth } from "../context/authContext";

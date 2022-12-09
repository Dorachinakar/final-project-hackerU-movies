import joi from "joi";
function FormikValidate(schema) {
  return (values) => {
    const { error } = joi.object(schema).validate(values, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    for (const detail of error.details) {
      error[detail.path[0]] = detail.message;
    }
    return errors;
  };
}

export default FormikValidate;

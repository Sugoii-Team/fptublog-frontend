import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-controls/InputField/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup
    .object({
      email: yup.string().required("Please enter title"),
      password: yup.string().required("Please enter title"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    values.username = values.email;
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <InputField
        name="email"
        type="text"
        label="Email"
        placeholder="eg: myemail@domain.com"
        form={form}
      />
      <InputField
        name="password"
        type="password"
        label="Password"
        placeholder="Password here"
        form={form}
      />

      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Login
      </button>
    </form>
  );
}

export default RegisterForm;

import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-controls/InputField/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancelClick: PropTypes.func,
};

function LoginForm({onSubmit, onCancelClick}) {
  const schema = yup
    .object({
      // identifier: yup.string().required("Please enter title"),
      username: yup.string().required("Please enter title"),
      password: yup.string().required("Please enter title"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      // identifier: "",
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  const handleCancleClick = (values) => {
    onCancelClick(values);
  }

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <InputField
        // name="identifier"
        name="username"
        type="text"
        label="Username"
        placeholder="eg: Username here"
        form={form}
      />
      <InputField
        name="password"
        type="password"
        label="Password"
        placeholder="Password here"
        form={form}
      />

      <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        onClick={() => handleCancleClick(false)}
        >
          Cancel
        </button>
        <button
          className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Login Now!
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

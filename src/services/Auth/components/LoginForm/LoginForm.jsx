import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-controls/InputField/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup
    .object({
      identifier: yup.string().required("Please enter title"),
      password: yup.string().required("Please enter title"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <InputField
        name="identifier"
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
    </form>
  );
}

export default LoginForm;

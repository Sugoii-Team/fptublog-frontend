import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled, type, placeholder } = props;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <div className="flex flex-col mt-3">
          <label htmlFor={name} className="font-bold">
            {label}
          </label>
          <input
            {...field}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            className="border-2 w-80 h-10 rounded-sm p-2"
          />
        </div>
      )}
      fullWidth
    />
  );
}

export default InputField;

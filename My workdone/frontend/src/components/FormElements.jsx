import React from "react";

function FormInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  min = undefined,
}) {
  return (
    <div className="mb-3">
      <input
        type={type}
        required
        placeholder={placeholder}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
      />
    </div>
  );
}

function ColorInput({ label, name, value, onChange }) {
  return (
    <div className="mb-3">
      <h2>{label}</h2>
      <input
        type="color"
        required
        className="form-control form-control-color w-100"
        name={name}
        value={value}
        onChange={onChange}
        title="Choose color"
      />
    </div>
  );
}

export { FormInput, ColorInput };
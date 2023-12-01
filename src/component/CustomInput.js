import React from "react";

const CustomInput = (props) => {
  const { type, name, classname, placeholder, value, onChange, onBlur } = props;
  return (
    <div>
      <input
        name={name}
        type={type}
        className={`form-control ${classname}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomInput;

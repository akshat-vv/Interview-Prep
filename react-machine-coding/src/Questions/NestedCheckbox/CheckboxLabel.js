import React, { useEffect, useRef } from "react";

export const CheckboxLabel = ({ id, label, status, handleChange }) => {
  const checkboxRef = useRef();

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = status === "indeterminate";
    }
  }, [status]);

  return (
    <label>
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={status === "checked"}
        onChange={() => handleChange(id)}
      />
      {label}
    </label>
  );
};

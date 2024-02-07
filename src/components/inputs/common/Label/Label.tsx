import React from "react";

import "./styles.css";

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  label: string;
  htmlFor?: string;
}

export const Label = ({
  label,
  htmlFor,
  className = "",
  ...rest
}: LabelProps) => {
  return (
    <label {...rest} htmlFor={htmlFor} className={`form-label ${className}`}>
      {label}
    </label>
  );
};

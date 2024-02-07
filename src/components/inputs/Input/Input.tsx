import React from "react";

import clsx from "clsx";

import "./styles.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className = "",
  type = "text",
  fullWidth,
  ...rest
}) => {
  const cn = clsx({
    "input-field": true,
    "input-field-fullWidth": fullWidth,
    "input-number-field": type === "number",
  });

  return <input {...rest} type={type} className={`${cn} ${className}`} />;
};

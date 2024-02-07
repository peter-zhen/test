import React from "react";

import { Input } from "../Input";
import { Label } from "../common/Label/Label";

import { InputProps } from "../Input/Input";

export interface InputLabelProps extends InputProps {
  label: string;
  htmlFor?: string;
  labelClassName?: string;
}

export const InputLabel: React.FC<InputLabelProps> = ({
  label,
  htmlFor,
  labelClassName = "",
  ...rest
}) => {
  return (
    <div className="input-with-label">
      <Label label={label} htmlFor={htmlFor} className={labelClassName} />
      <Input {...rest} id={htmlFor} />
    </div>
  );
};

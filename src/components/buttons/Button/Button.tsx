import React from "react";

import clsx from "clsx";

import { ReactComponent as LoadingSpinner } from "../../../assets/svgs/Rolling-1s-18px.svg";

import "./styles.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "contained" | "danger";
  iconSrc?: string;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "contained",
  iconSrc,
  iconPosition,
  isLoading = false,
  disabled,
  fullWidth,
  ...rest
}) => {
  const cn = clsx({
    [variant]: true,
    "custom-button": true,
    "custom-button-fullWidth": fullWidth,
    "custom-button-loading": isLoading,
  });

  return (
    <button
      {...rest}
      className={`${cn} ${className}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {iconSrc && iconPosition === "left" && (
            <img src={iconSrc} alt="Icon" />
          )}
          <span>{children}</span>
          {iconSrc && iconPosition === "right" && (
            <img src={iconSrc} alt="Icon" />
          )}
        </>
      )}
    </button>
  );
};

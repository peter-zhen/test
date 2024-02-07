import React, { ReactNode } from "react";

import clsx from "clsx";

import "./styles.css";

interface GreyContainerProps {
  align?: "center" | "right" | "left";
  children: ReactNode;
}

export const GreyContainer = ({
  align = "left",
  children,
}: GreyContainerProps) => {
  const className = clsx({
    "grey-container": true,
    "grey-container-center": align === "center",
    "grey-container-left": align === "left",
  });

  return <div className={className}>{children}</div>;
};

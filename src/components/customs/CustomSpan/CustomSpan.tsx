import React, { ReactNode } from "react";

interface CustomSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const CustomSpan = ({ children, ...rest }: CustomSpanProps) => {
  return <span {...rest}>{children}</span>;
};

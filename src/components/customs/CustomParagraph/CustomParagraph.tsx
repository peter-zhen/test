import React, { ReactNode } from "react";

interface CustomParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const CustomParagraph = ({
  children,
  ...rest
}: CustomParagraphProps) => {
  return <p {...rest}>{children}</p>;
};

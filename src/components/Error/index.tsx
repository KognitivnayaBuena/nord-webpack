import * as React from "react";
import classNames from "classnames";

import "./index.css";

type ErrorProps = {
  className?: string;
  children: string;
};

export const Error = ({ children, className }: ErrorProps) => {
  return (
    <span className={classNames("error-wrapper", className)}>{children}</span>
  );
};

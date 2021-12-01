import * as React from "react";
import classNames from "classnames";

import "./index.css";

type ButtonProps = {
  disabled?: boolean;
  className: string;
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
  const { children, className, disabled, type = "button", onClick } = props;
  return (
    <button
      className={classNames("button", className)}
      disabled={disabled}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
};

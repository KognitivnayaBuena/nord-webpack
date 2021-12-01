import * as React from "react";
import { useSelector } from "react-redux";

import { LoginForm } from "../LoginForm";
import { userTokenSelector } from "../../redux/user/actions";

type PrivateProps = {
  children: JSX.Element;
};

export const Private = ({ children }: PrivateProps) => {
  const isLoggedIn = Boolean(useSelector(userTokenSelector));
  return (
    <>
      {!isLoggedIn && <LoginForm />}
      {isLoggedIn && children}
    </>
  );
};

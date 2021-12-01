import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button";
import { Error } from "../Error";
import {
  loginUser,
  userErrorMessageSelector,
  userStatusSelector,
} from "../../redux/user/actions";

import "./index.css";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const status = useSelector(userStatusSelector);
  const errorMessage = useSelector(userErrorMessageSelector);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isDisableButton = (!password || !username) && status !== "loading";
  const isError = status === "error";

  const usernameOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <form className={"login-form"} onSubmit={onSubmitHandler}>
      <h2>Log In</h2>
      {isError && <Error className={"login-form__error"}>{errorMessage}</Error>}
      <label
        className={"login-form__username-label"}
        htmlFor={"login-form__username-input"}>
        Login
      </label>
      <input
        className={"login-form__username-input"}
        id={"login-form__username-input"}
        value={username}
        type={"text"}
        required
        onChange={usernameOnChangeHandler}
      />
      <label
        className={"login-form__password-label"}
        htmlFor={"login-form__password-input"}>
        Password
      </label>
      <input
        className={"login-form__password-input"}
        id={"login-form__password-input"}
        value={password}
        type={"password"}
        required
        onChange={passwordOnChangeHandler}
      />
      <Button
        className={"login-form__submit-button"}
        disabled={isDisableButton}
        type={"submit"}>
        Log In
      </Button>
    </form>
  );
};

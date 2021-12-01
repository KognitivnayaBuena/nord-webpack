export type LogInPayload = {
  username: string;
  password: string;
};

export type UserState = {
  token: string;
  status: "success" | "loading" | "error";
  errorMessage: string;
};

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Status, Store } from "../types";
import { LogInPayload, UserState } from "./types";
import { api } from "../../api";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }: LogInPayload) => {
    const response = await api.fetchUserToken({ username, password });
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    status: "success",
    errorMessage: "",
  },
  reducers: {
    clearState: (state: UserState) => {
      state.status = "success";

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUser.fulfilled,
      (state: UserState, { payload }: { payload: { token: string } }) => {
        state.token = payload.token;
        state.status = "success";
        return state;
      }
    ),
      builder.addCase(loginUser.rejected, (state: UserState, action) => {
        state.status = "error";
        state.errorMessage = action.error.message;
        return state;
      }),
      builder.addCase(loginUser.pending, (state: UserState) => {
        state.status = "loading";
        return state;
      }),
      builder.addDefaultCase((state, action) => {});
  },
});

export const { clearState } = userSlice.actions;

export const userTokenSelector = (state: Store): string => state.user.token;
export const userStatusSelector = (state: Store): Status => state.user.status;
export const userErrorMessageSelector = (state: Store): string =>
  state.user.errorMessage;

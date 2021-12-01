import { UserState } from "./../user/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Status, Store } from "../types";
import { Server, ServersState } from "./types";

import { api } from "../../api";

export const fetchServers = createAsyncThunk(
  "servers/fetchServers",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as { user: UserState };
    const token = user.token;

    const response = await api.fetchServersList({ token });
    return response;
  }
);

export const serversSlice = createSlice({
  name: "servers",
  initialState: {
    servers: [
      {
        id: "0",
        name: "",
        distance: 1,
      },
    ],
    errorMessage: "",
    status: "success",
  },
  reducers: {
    clearState: (state) => {
      state.servers = [
        {
          id: "0",
          name: "",
          distance: 1,
        },
      ];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchServers.fulfilled,
      (state: ServersState, { payload }) => {
        const serversWithId: Server[] = payload.map((server: Server) => {
          const id = `${server.name}-${server.distance}`;
          return { ...server, id };
        });
        state.servers = serversWithId;
        state.status = "success";
        return state;
      }
    ),
      builder.addCase(fetchServers.rejected, (state: ServersState, action) => {
        state.errorMessage = action.error.message;
        state.status = "error";
      }),
      builder.addCase(fetchServers.pending, (state: ServersState) => {
        state.status = "loading";
      }),
      builder.addDefaultCase((state, action) => {});
  },
});

export const serversSelector = (state: Store): Server[] =>
  state.servers.servers;
export const serversStatusSelector = (state: Store): Status =>
  state.servers.status;
export const serversErrorMessageSelector = (state: Store): string =>
  state.servers.errorMessage;

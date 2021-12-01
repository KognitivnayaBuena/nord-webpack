import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/actions";
import { serversSlice } from "./servers/actions";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    servers: serversSlice.reducer,
  },
});

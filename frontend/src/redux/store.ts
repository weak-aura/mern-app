import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/slices/authSlice.ts";
import postSlice from "./features/slices/postSlice.ts";
export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    postReducer: postSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

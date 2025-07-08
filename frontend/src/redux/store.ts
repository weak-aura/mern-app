import {configureStore, combineReducers} from "@reduxjs/toolkit";
import authSlice from "./features/slices/authSlice.ts";
import postSlice from "./features/slices/postSlice.ts";
import navigationSlice from "./features/slices/navigationSlice.ts";
import storage from "redux-persist/lib/storage"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  authReducer: authSlice,
  postReducer: postSlice,
  navigationReducer: navigationSlice,
})

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedSate = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedSate,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// import {configureStore} from "@reduxjs/toolkit";
// import authSlice from "./features/slices/authSlice.ts";
// import postSlice from "./features/slices/postSlice.ts";
// import navigationSlice from "./features/slices/navigationSlice.ts";
// export const store = configureStore({
//   reducer: {
//     authReducer: authSlice,
//     postReducer: postSlice,
//     navigationReducer: navigationSlice,
//   },
// })
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

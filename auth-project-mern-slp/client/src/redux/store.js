import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer }); // we can add multiple here.

const persistConfig = {
    key: "root", //just name : can be anything meaningful like user
    version: 1,
    storage, // save in local storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer); // complete reducer

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store); // for main.jsx

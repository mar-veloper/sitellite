import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import toastInfo from "../store/middleware/toastInfo";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), toastInfo, api],
  });
}

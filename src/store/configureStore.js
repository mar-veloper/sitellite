import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import toastError from "../store/middleware/toast";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), toastError, api],
  });
}

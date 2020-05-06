import { combineReducers } from "redux";
import satelliteReducers from "./satellites";

export default combineReducers({
  satellites: satelliteReducers,
});

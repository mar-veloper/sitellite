import axios from "axios";
import * as actions from "../apiCall";

const api = ({ dispatch }) => (next) => async (action) => {
  // destructure your action... const {type, payload} = action;

  const { type, payload } = action;
  const { apiCallBegan, apiCallSuccess, apiCallFailed } = actions;

  if (type !== apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = payload;

  onStart && dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: "https://api.spacexdata.com/v3/payloads",
      url,
      method,
      data,
    });

    // General
    dispatch(apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(apiCallFailed(error.message));
    // Specific
    if (onError) return dispatch({ type: onError, payload: error.message });
  }
};

export default api;

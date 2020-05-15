import axios from "axios";
import * as actions from "../apiCall";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

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
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) return dispatch({ type: onError, payload: error.message });
  }
};

export default api;

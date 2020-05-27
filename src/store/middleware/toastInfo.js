import { toast } from "react-toastify";

const toastInfo = (store) => (next) => (action) => {
  // destructure... const {type, payload} = action;
  const { type, payload } = action;
  switch (type) {
    case "error":
      return toast.error(payload.message);

    case "success":
      return toast.success(payload.message);
    default:
      return next(action);
  }
};

export default toastInfo;

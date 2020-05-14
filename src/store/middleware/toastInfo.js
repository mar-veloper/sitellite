import { toast } from "react-toastify";

const toastInfo = (store) => (next) => (action) => {
  switch (action.type) {
    case "error":
      return toast.error(action.payload.message);

    case "success":
      return toast.success(action.payload.message);
    default:
      return next(action);
  }
};

export default toastInfo;

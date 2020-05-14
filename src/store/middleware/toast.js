import { toast } from "react-toastify";

const toastError = (store) => (next) => (action) =>
  action.type === "error" ? toast.error(action.payload.message) : next(action);

export default toastError;

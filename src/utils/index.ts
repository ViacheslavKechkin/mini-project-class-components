import { toast } from "react-toastify";

const showError = (message: string) =>
  toast.error(message, {
    position: "bottom-right",
    autoClose: 2000,
  });
export default showError;

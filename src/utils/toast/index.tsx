import { toast } from "react-toastify";

const toastError = (message: string) => {
  toast.dismiss();
  toast.error(message);
};

const toastSuccess = (massage: string) => {
  toast.dismiss();
  toast.success(massage);
};

export { toastError, toastSuccess };

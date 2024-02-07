import { toastError } from "../toast";

const isValidAndPositiveNumber = (input) => {
  const positiveNumberRegex = /^[1-9]\d*(\.\d+)?$/;
  return positiveNumberRegex.test(input);
};

export const validateDonation = (
  quantity: string,
  selectedOption: number | null,
  handleSubmit: () => void
) => {
  if (isNaN(+quantity) || !isValidAndPositiveNumber(parseFloat(quantity))) {
    toastError("Please enter a valid number");
  } else if (+quantity <= 0 || quantity === undefined) {
    toastError("Amount must be greater than 0");
  } else if (selectedOption === null) {
    toastError("Please select at least one wallet");
  } else {
    handleSubmit();
  }
};

export const validatePayment = (quantity: string, handleSubmit: () => void) => {
  if (isNaN(+quantity) || !isValidAndPositiveNumber(parseFloat(quantity))) {
    toastError("Please enter a valid number");
  } else if (+quantity <= 0 || quantity === undefined) {
    toastError("Amount must be greater than 0");
  } else {
    handleSubmit();
  }
};

import React from "react";

import { Input } from "../../../../../../components/inputs/Input";
import { Label } from "../../../../../../components/inputs/common/Label/Label";

import { InputLabelProps } from "../../../../../../components/inputs/InputLabel/InputLabel";

import TetherImage from "../../../../../../assets/images/tether.png";

import "./styles.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PaymentAdornmentInputProps extends InputLabelProps {}

export const PaymentAdornmentInput: React.FC<PaymentAdornmentInputProps> = ({
  label,
  htmlFor,
  ...rest
}) => {
  return (
    <div>
      <Label label={label} htmlFor={htmlFor} />
      <div className="payment-adornment-input">
        <Input {...rest} id={htmlFor} />
        <PaymentAdornment />
      </div>
    </div>
  );
};

export const PaymentAdornment = () => {
  return (
    <div className="payment-adornment">
      <img src={TetherImage} alt="Payment Adornment Icon" />
      <span>USDT</span>
    </div>
  );
};

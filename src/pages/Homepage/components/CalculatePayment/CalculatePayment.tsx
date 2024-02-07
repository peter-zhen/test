import React from "react";

import { GreyContainer } from "../../../../components/wrappers";
import { Input } from "../../../../components/inputs/Input/Input";

import "./styles.css";

interface CalculatePaymentProps {
  quantity: string;
  handleChange: (newQuantity: string) => void;
}

export const CalculatePayment = ({
  quantity,
  handleChange,
}: CalculatePaymentProps) => {
  return (
    <GreyContainer>
      <h2 className="calculate-payment-text">您共计支付</h2>
      <Input
        className="calculate-payment-input"
        type="number"
        placeholder="某金额"
        name="quantity"
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
      />
      <span className="calculate-payment-input-text">USDT</span>
    </GreyContainer>
  );
};

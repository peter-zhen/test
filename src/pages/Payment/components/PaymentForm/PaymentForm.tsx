import React from "react";

import { PaymentHeading } from "../PaymentHeading";
import { InputLabel } from "../../../../components/inputs/InputLabel";
import { PaymentAdornmentInput } from "./components/PaymentAdornmentInput";
import { Button } from "../../../../components/buttons";

import "./styles.css";

interface PaymentFormProps {
  address?: string;
  quantity: string;
  submitLoading?: boolean;
  handleQuantityChange: (quantity: string) => void;
  onSubmit: () => void;
  onDisconnect: () => void;
}

export const PaymentForm = ({
  address,
  quantity,
  submitLoading = false,
  handleQuantityChange,
  onSubmit,
  onDisconnect,
}: PaymentFormProps) => {
  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleQuantityChange(e.target.value);
  };

  return (
    <div className="payment-form-container">
      <PaymentHeading />
      <div className="payment-form-inputs">
        <InputLabel
          className="payment-form-input"
          type="text"
          placeholder="漂亮美眉AI生成工作室"
          label={"支付账号"}
          htmlFor={"account"}
        />
        <PaymentAdornmentInput
          className="payment-form-input with-adornment"
          label={"支付货币"}
          type="number"
          placeholder="الإغاثة الإسلامية العالمية"
          min={0}
          value={quantity}
          step={"1"}
          htmlFor={"amount"}
          onChange={onQuantityChange}
        />
        {address && (
          <InputLabel
            label="Address"
            className="payment-form-input"
            placeholder="Addpress"
            value={address}
            disabled
          />
        )}
        <div className="payment-form-buttons">
          <Button
            isLoading={submitLoading}
            className="payment-form-btn"
            variant="contained"
            onClick={onSubmit}
          >
            支付金额
          </Button>
          <Button
            className="payment-form-btn"
            variant="danger"
            onClick={onDisconnect}
          >
            断开
          </Button>
        </div>
      </div>
    </div>
  );
};

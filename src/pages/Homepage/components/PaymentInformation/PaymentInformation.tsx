import React from "react";

import { CustomParagraph } from "../../../../components/customs";

import "./styles.css";

interface PaymentInformationProps {
  suffix: string | undefined;
}

export const PaymentInformation = ({ suffix }: PaymentInformationProps) => {
  return (
    <CustomParagraph className="payment-info-text">{` 您正在使用 ${suffix} 代币作为支付方式`}</CustomParagraph>
  );
};

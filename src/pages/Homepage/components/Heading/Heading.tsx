import React from "react";

import { GreyContainer } from "../../../../components/wrappers";

import "./styles.css";

export const Heading = () => {
  return (
    <div className="heading-container">
      <GreyContainer align="center">
        <h2 className="heading-text">聚合支付 YosuPay</h2>
      </GreyContainer>
    </div>
  );
};

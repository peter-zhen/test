import React from "react";

import { Navigate } from "react-router-dom";

import {
  ConnectionsEnum,
  useConnectionType,
} from "../../providers/ConnectionTypeProvider";

import { EthereumContainer, TronContainer } from "./containers";

import "./styles.css";

const PaymentPage = () => {
  const { connectionType } = useConnectionType();

  const components = {
    [ConnectionsEnum.Eth]: EthereumContainer,
    [ConnectionsEnum.Trc]: TronContainer,
  };

  if (!connectionType) {
    return <Navigate to="/" replace={true} />;
  }

  if (connectionType && components[connectionType]) {
    const Container = components[connectionType];

    return (
      <div className="payment-container">
        <Container />
      </div>
    );
  }

  return null;
};

export default PaymentPage;

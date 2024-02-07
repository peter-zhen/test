import React from "react";

import { Button } from "../../../../components/buttons";

import "./styles.css";

interface ISubmitButton {
  onSubmit: () => void;
}

export const SubmitButton = ({ onSubmit }: ISubmitButton) => {
  return (
    <div className="submit-button-container">
      <Button className="submit-button" onClick={onSubmit}>
        连接钱包
      </Button>
    </div>
  );
};

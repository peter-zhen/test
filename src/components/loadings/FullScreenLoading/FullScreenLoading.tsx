import React from "react";

import MainIcon from "../../../assets/images/icon.png";

import "./styles.css";

export const FullScreenLoading = () => {
  return (
    <div className="full-screen-loading">
      <img className="scaling-icon" src={MainIcon} alt="Main Icon" />
    </div>
  );
};

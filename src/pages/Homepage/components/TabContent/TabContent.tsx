import React from "react";

import { CurrencyDataType } from "../../../../constant";

import { ReactComponent as ActiveIcon } from "../../../../assets/svgs/active.svg";
import { ReactComponent as InactiveIcon } from "../../../../assets/svgs/inactive.svg";

import "./styles.css";

interface TabContentProps {
  tabContentData: CurrencyDataType[];
  selectedOptionIndex: number | null;
  handleOptionChange: (index: number, item: CurrencyDataType) => void;
}

export const TabContent = ({
  tabContentData,
  selectedOptionIndex,
  handleOptionChange,
}: TabContentProps) => {
  return (
    <div className="payment-method-section">
      {tabContentData.map((item: CurrencyDataType, index) => {
        const paymentMethodClassName =
          index !== tabContentData.length - 1 ? "apply-class" : "";

        return (
          <div
            onClick={() => handleOptionChange(index, item)}
            className={`payment-method ${paymentMethodClassName}`}
            key={item.id}
          >
            <div className="payment-method-leftside-content">
              <img src={item.image} alt={`img-${index}`} />
              <div>
                <div className="payment-method-title-container">
                  {item.title}
                  {item?.isAvailable ? <ActiveIcon /> : <InactiveIcon />}
                </div>
                <div>
                  代币类型
                  <span>{"- " + item.suffix}</span>
                </div>
              </div>
            </div>

            <div className="payment-method-input">
              <label key={index}>
                <input
                  type="radio"
                  value={index}
                  checked={selectedOptionIndex === index}
                  onChange={() => handleOptionChange(index, item)}
                />
                <div className="radio-btn-inner"></div>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

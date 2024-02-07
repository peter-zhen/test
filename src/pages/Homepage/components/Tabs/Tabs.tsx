import React from "react";

import { Button } from "../../../../components/buttons";

import Erc20Icon from "../../../../assets/images/er20.svg";
import Trc20Icon from "../../../../assets/images/tr20.svg";

import "./styles.css";

interface TabsProps {
  selectedTab: number;
  handleChange: (tab: number) => void;
}

type TabContent = {
  iconSrc: string;
  title: string;
  suffix: string;
  id: number;
};

const tabsList: TabContent[] = [
  { iconSrc: Trc20Icon, title: "Trc20", suffix: "TRC-20", id: 1 },
  { iconSrc: Erc20Icon, title: "Erc20", suffix: "ERC-20", id: 2 },
];

export const Tabs = ({ selectedTab, handleChange }: TabsProps) => {
  return (
    <div className="payment-btn-section">
      {tabsList.map((tab: TabContent) => {
        return (
          <Button
            key={tab.id}
            className="payment-btn"
            iconPosition="left"
            iconSrc={tab.iconSrc}
            variant={selectedTab === tab.id ? "contained" : "outline"}
            onClick={() => handleChange(tab.id)}
          >
            {tab.title}
          </Button>
        );
      })}
    </div>
  );
};
